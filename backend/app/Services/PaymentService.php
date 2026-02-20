<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use App\Models\WalletTransaction;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentService
{
    private $paystackBaseUrl = 'https://api.paystack.co';
    private $paystackSecretKey;

    public function __construct()
    {
        $this->paystackSecretKey = config('services.paystack.secret');
    }

    /**
     * Initialize a payment transaction with Paystack
     */
    public function initializePayment(Order $order)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->paystackSecretKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->paystackBaseUrl}/transaction/initialize", [
                'email' => $order->buyer->email,
                'amount' => $order->total_price * 100, // Paystack expects amount in kobo
                'reference' => $this->generateReference($order->id),
                'callback_url' => config('app.url') . '/api/webhooks/paystack',
                'metadata' => [
                    'order_id' => $order->id,
                    'buyer_id' => $order->buyer_id,
                    'seller_id' => $order->seller_id,
                    'listing_id' => $order->listing_id,
                    'quantity' => $order->quantity,
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                // Create payment record
                Payment::create([
                    'order_id' => $order->id,
                    'buyer_id' => $order->buyer_id,
                    'seller_id' => $order->seller_id,
                    'amount' => $order->total_price,
                    'payment_method' => 'paystack',
                    'reference_id' => $data['data']['reference'],
                    'status' => 'pending',
                    'response_data' => json_encode($data)
                ]);

                // Update order status
                $order->update(['status' => 'pending']);

                return [
                    'success' => true,
                    'authorization_url' => $data['data']['authorization_url'],
                    'access_code' => $data['data']['access_code'],
                    'reference' => $data['data']['reference']
                ];
            }

            return [
                'success' => false,
                'message' => 'Failed to initialize payment',
                'error' => $response->json()
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Payment initialization error',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Verify a payment transaction
     */
    public function verifyPayment($reference)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->paystackSecretKey,
            ])->get("{$this->paystackBaseUrl}/transaction/verify/{$reference}");

            if (!$response->successful()) {
                return [
                    'success' => false,
                    'message' => 'Payment verification failed'
                ];
            }

            $data = $response->json();
            $paymentData = $data['data'];

            // Check if payment was successful
            if ($paymentData['status'] === 'success') {
                return $this->handleSuccessfulPayment($reference, $paymentData);
            } else {
                return [
                    'success' => false,
                    'message' => 'Payment was not completed',
                    'status' => $paymentData['status']
                ];
            }
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error verifying payment',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Handle successful payment
     */
    private function handleSuccessfulPayment($reference, $paymentData)
    {
        try {
            // Find the payment record
            $payment = Payment::where('reference_id', $reference)->first();

            if (!$payment) {
                return [
                    'success' => false,
                    'message' => 'Payment record not found'
                ];
            }

            // Update payment status
            $payment->update([
                'status' => 'completed',
                'response_data' => json_encode($paymentData)
            ]);

            // Update order status
            $order = $payment->order;
            $order->update(['status' => 'paid']);

            // Create wallet transaction for seller
            WalletTransaction::create([
                'user_id' => $order->seller_id,
                'amount' => (int) ($payment->amount * 0.95), // 95% to seller (5% platform fee)
                'type' => 'credit',
                'reference' => $reference,
                'order_id' => $order->id
            ]);

            // Create wallet transaction for platform (if fee structure differs)
            // Platform takes 5% for facilitating the transaction

            return [
                'success' => true,
                'message' => 'Payment verified and processed',
                'order_id' => $order->id,
                'status' => 'completed'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error processing successful payment',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Handle Paystack webhook for payment verification
     */
    public function handleWebhook($data)
    {
        try {
            // Verify the webhook is from Paystack
            $hash = hash('sha512', json_encode($data) . config('services.paystack.secret'));
            
            if ($hash !== request()->header('X-Paystack-Signature')) {
                return [
                    'success' => false,
                    'message' => 'Invalid webhook signature'
                ];
            }

            // Process the event
            if ($data['event'] === 'charge.success') {
                return $this->handleSuccessfulPayment(
                    $data['data']['reference'],
                    $data['data']
                );
            }

            return [
                'success' => true,
                'message' => 'Webhook processed'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Webhook processing error',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Refund a payment
     */
    public function refundPayment(Payment $payment)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->paystackSecretKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->paystackBaseUrl}/refund", [
                'transaction' => $payment->reference_id,
                'amount' => $payment->amount * 100 // in kobo
            ]);

            if ($response->successful()) {
                $payment->update(['status' => 'refunded']);
                
                // Reverse the wallet transaction
                WalletTransaction::create([
                    'user_id' => $payment->seller_id,
                    'amount' => (int) ($payment->amount * 0.95),
                    'type' => 'debit',
                    'reference' => $payment->reference_id . '_refund',
                    'order_id' => $payment->order_id
                ]);

                return [
                    'success' => true,
                    'message' => 'Refund processed successfully'
                ];
            }

            return [
                'success' => false,
                'message' => 'Refund request failed',
                'error' => $response->json()
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error processing refund',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Get list of banks for bank transfers
     */
    public function getBankList()
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->paystackSecretKey,
            ])->get("{$this->paystackBaseUrl}/bank");

            if ($response->successful()) {
                return [
                    'success' => true,
                    'banks' => $response->json()['data']
                ];
            }

            return [
                'success' => false,
                'message' => 'Failed to fetch bank list'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching bank list',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Resolve account number for recipient bank
     */
    public function resolveAccountNumber($account_number, $bank_code)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->paystackSecretKey,
            ])->get("{$this->paystackBaseUrl}/bank/resolve", [
                'account_number' => $account_number,
                'bank_code' => $bank_code
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json()['data']
                ];
            }

            return [
                'success' => false,
                'message' => 'Account resolution failed'
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error resolving account',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Process withdrawal to seller's bank account
     */
    public function processWithdrawal($seller_id, $amount, $account_number, $bank_code)
    {
        try {
            // Resolve account first
            $accountResolution = $this->resolveAccountNumber($account_number, $bank_code);
            if (!$accountResolution['success']) {
                return $accountResolution;
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->paystackSecretKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->paystackBaseUrl}/transfer", [
                'source' => 'balance',
                'amount' => $amount * 100, // in kobo
                'recipient_code' => $accountResolution['data']['recipient_code'],
                'reason' => 'EcoTrade Seller Payout'
            ]);

            if ($response->successful()) {
                // Create wallet transaction record
                WalletTransaction::create([
                    'user_id' => $seller_id,
                    'amount' => $amount,
                    'type' => 'debit',
                    'reference' => $response->json()['data']['reference'],
                ]);

                return [
                    'success' => true,
                    'message' => 'Withdrawal processed',
                    'reference' => $response->json()['data']['reference']
                ];
            }

            return [
                'success' => false,
                'message' => 'Withdrawal failed',
                'error' => $response->json()
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error processing withdrawal',
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Generate unique payment reference
     */
    private function generateReference($order_id)
    {
        return 'ecotrade_' . $order_id . '_' . time() . '_' . Str::random(8);
    }
}
