<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('throttle:60,1')->group(function () {
    
    // Public Routes
    Route::post('/auth/register', 'AuthController@register');
    Route::post('/auth/login', 'AuthController@login');
    
    // Public Listings (Read Only)
    Route::get('/listings', 'ListingController@index');
    Route::get('/listings/{id}', 'ListingController@show');
    
    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth
        Route::post('/auth/logout', 'AuthController@logout');
        Route::post('/auth/refresh', 'AuthController@refresh');
        Route::get('/auth/user', 'AuthController@user');
        
        // User Management
        Route::prefix('users')->group(function () {
            Route::get('/{id}', 'UserController@show');
            Route::put('/{id}', 'UserController@update');
            Route::get('/{id}/wallet', 'WalletController@balance');
            Route::get('/{id}/ratings', 'UserController@ratings');
            Route::get('/{id}/saved-items', 'UserController@savedItems');
        });
        
        // Listings (CRUD for Sellers)
        Route::prefix('listings')->group(function () {
            Route::post('/', 'ListingController@store')->middleware('role:seller');
            Route::put('/{id}', 'ListingController@update')->middleware('role:seller');
            Route::delete('/{id}', 'ListingController@destroy')->middleware('role:seller');
            Route::get('/{id}/inquiries', 'ListingController@inquiries')->middleware('role:seller');
            
            // Buyer actions
            Route::post('/{id}/save', 'ListingController@save')->middleware('role:buyer');
            Route::delete('/{id}/save', 'ListingController@unsave')->middleware('role:buyer');
        });
        
        // Orders
        Route::prefix('orders')->group(function () {
            Route::get('/', 'OrderController@index');
            Route::get('/{id}', 'OrderController@show');
            Route::post('/', 'OrderController@store')->middleware('role:buyer');
            Route::put('/{id}/status', 'OrderController@updateStatus');
            Route::get('/{id}/tracking', 'OrderController@tracking');
            Route::post('/{id}/dispute', 'OrderController@dispute');
        });
        
        // Messages & Conversations
        Route::prefix('conversations')->group(function () {
            Route::get('/', 'ConversationController@index');
            Route::get('/{id}/messages', 'MessageController@index');
            Route::post('/{id}/messages', 'MessageController@store');
            Route::put('/{id}/mark-read', 'ConversationController@markRead');
        });
        
        // Payments
        Route::prefix('payments')->group(function () {
            Route::post('/initiate', 'PaymentController@initiate');
            Route::get('/verify/{reference}', 'PaymentController@verify');
            Route::get('/', 'PaymentController@history');
        });
        
        // Wallet
        Route::prefix('wallet')->group(function () {
            Route::get('/balance', 'WalletController@balance');
            Route::get('/transactions', 'WalletController@transactions');
            Route::post('/withdraw', 'WalletController@withdraw');
        });
        
        // Ratings & Reviews
        Route::post('/ratings/{order_id}', 'RatingController@store');
        Route::get('/ratings/{user_id}', 'RatingController@userRatings');
        
        // Admin Routes
        Route::middleware('role:admin')->group(function () {
            Route::prefix('admin')->group(function () {
                // User Management
                Route::get('/users', 'Admin/UserAdminController@index');
                Route::put('/users/{id}/status', 'Admin/UserAdminController@updateStatus');
                Route::delete('/users/{id}', 'Admin/UserAdminController@delete');
                
                // Listing Moderation
                Route::get('/listings', 'Admin/ListingAdminController@index');
                Route::put('/listings/{id}/status', 'Admin/ListingAdminController@updateStatus');
                Route::delete('/listings/{id}', 'Admin/ListingAdminController@delete');
                
                // Order Management
                Route::get('/orders', 'Admin/OrderAdminController@index');
                Route::put('/orders/{id}/status', 'Admin/OrderAdminController@updateStatus');
                Route::get('/orders/{id}/details', 'Admin/OrderAdminController@show');
                
                // Payment Management
                Route::get('/payments', 'Admin/PaymentAdminController@index');
                Route::get('/payments/{id}', 'Admin/PaymentAdminController@show');
                Route::post('/payments/{id}/refund', 'Admin/PaymentAdminController@refund');
                
                // Analytics
                Route::get('/analytics/dashboard', 'Admin/AnalyticsController@dashboard');
                Route::get('/analytics/revenue', 'Admin/AnalyticsController@revenue');
                Route::get('/analytics/users', 'Admin/AnalyticsController@users');
                Route::get('/analytics/listings', 'Admin/AnalyticsController@listings');
                Route::get('/analytics/orders', 'Admin/AnalyticsController@orders');
                
                // Reports
                Route::get('/reports/disputes', 'Admin/ReportController@disputes');
                Route::post('/reports/{id}/resolve', 'Admin/ReportController@resolve');
            });
        });
    });
});

// Webhook for Payment Verification
Route::post('/webhooks/paystack', 'PaymentController@webhook');

// Health Check
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
