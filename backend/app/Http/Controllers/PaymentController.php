<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Initiate a payment for an order
     */
    public function initiate(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::with(['buyer', 'seller'])->find($validated['order_id']);

        // Verify order belongs to authenticated user
        if ($order->buyer_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // Check if order is in pending status
        if ($order->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be paid at this stage'
            ], 400);
        }

        // Initialize payment with Paystack
        $result = $this->paymentService->initializePayment($order);

        if ($result['success']) {
            return response()->json($result);
        }

        return response()->json($result, 400);
    }

    /**
     * Verify a payment transaction
     */
    public function verify($reference)
    {
        $result = $this->paymentService->verifyPayment($reference);

        if ($result['success']) {
            return response()->json($result);
        }

        return response()->json($result, 400);
    }

    /**
     * Get payment history for authenticated user
     */
    public function history(Request $request)
    {
        $payments = Payment::where('buyer_id', auth()->id())
            ->with(['order.listing', 'order.seller'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }

    /**
     * Get payment details
     */
    public function show(Payment $payment)
    {
        // Verify user has access to this payment
        if ($payment->buyer_id !== auth()->id() && $payment->seller_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $payment->load(['order.listing', 'order.buyer', 'order.seller'])
        ]);
    }

    /**
     * Handle Paystack webhook
     */
    public function webhook(Request $request)
    {
        // Verify the request is from Paystack
        $hash = hash('sha512', json_encode($request->all()) . config('services.paystack.secret'));
        
        if ($hash !== $request->header('X-Paystack-Signature')) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid signature'
            ], 400);
        }

        $result = $this->paymentService->handleWebhook($request->all());

        return response()->json($result);
    }

    /**
     * Initiate refund (Admin/Seller only)
     */
    public function refund(Request $request, Payment $payment)
    {
        // Verify authorization
        if ($payment->seller_id !== auth()->id() && !auth()->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // Check if payment can be refunded
        if ($payment->status !== 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'Only completed payments can be refunded'
            ], 400);
        }

        $result = $this->paymentService->refundPayment($payment);

        if ($result['success']) {
            return response()->json($result);
        }

        return response()->json($result, 400);
    }

    /**
     * Get available banks for withdrawal
     */
    public function getBanks()
    {
        $result = $this->paymentService->getBankList();

        return response()->json($result);
    }

    /**
     * Resolve bank account
     */
    public function resolveAccount(Request $request)
    {
        $validated = $request->validate([
            'account_number' => 'required|digits:10',
            'bank_code' => 'required'
        ]);

        $result = $this->paymentService->resolveAccountNumber(
            $validated['account_number'],
            $validated['bank_code']
        );

        return response()->json($result);
    }

    /**
     * Process withdrawal to bank account
     */
    public function withdraw(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1000',
            'account_number' => 'required|digits:10',
            'bank_code' => 'required'
        ]);

        $user = auth()->user();
        
        // Check if user is a seller
        if (!$user->isSeller()) {
            return response()->json([
                'success' => false,
                'message' => 'Only sellers can withdraw'
            ], 403);
        }

        // Check if user has sufficient wallet balance
        $walletBalance = $user->getWalletBalance();
        if ($walletBalance < $validated['amount']) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient wallet balance',
                'available' => $walletBalance
            ], 400);
        }

        $result = $this->paymentService->processWithdrawal(
            $user->id,
            $validated['amount'],
            $validated['account_number'],
            $validated['bank_code']
        );

        if ($result['success']) {
            return response()->json($result);
        }

        return response()->json($result, 400);
    }
}
