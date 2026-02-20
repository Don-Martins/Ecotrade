<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTables extends Migration
{
    public function up()
    {
        // Users Table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->enum('role', ['buyer', 'seller', 'admin'])->default('buyer');
            $table->string('business_name')->nullable();
            $table->string('address')->nullable();
            $table->string('avatar_url')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Listings Table
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('material_type'); // Plastic, Metal, Paper, Glass, Electronics
            $table->integer('quantity'); // in kg
            $table->integer('price_per_kg'); // in Naira
            $table->string('location');
            $table->json('image_urls')->nullable();
            $table->enum('status', ['active', 'pending', 'sold'])->default('pending');
            $table->integer('views_count')->default(0);
            $table->integer('inquiries_count')->default(0);
            $table->timestamps();
            $table->index('seller_id');
            $table->index('status');
            $table->fullText('title', 'description');
        });

        // Orders Table
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('listing_id')->constrained('listings')->onDelete('restrict');
            $table->integer('quantity'); // kg ordered
            $table->integer('total_price'); // in Naira
            $table->enum('status', ['pending', 'paid', 'shipped', 'delivered', 'disputed', 'completed'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->text('delivery_address')->nullable();
            $table->timestamps();
            $table->index('buyer_id');
            $table->index('seller_id');
            $table->index('status');
        });

        // Saved Items (Wishlist)
        Schema::create('saved_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('listing_id')->constrained('listings')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['buyer_id', 'listing_id']);
        });

        // Conversations Table
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('last_message_id')->nullable()->constrained('messages')->onDelete('set null');
            $table->timestamps();
            $table->index(['buyer_id', 'seller_id']);
        });

        // Messages Table
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('conversations')->onDelete('cascade');
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->text('content');
            $table->string('attachment_url')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->index('conversation_id');
            $table->index('sender_id');
        });

        // Wallet Transactions Table
        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('amount'); // in Naira
            $table->enum('type', ['credit', 'debit']);
            $table->string('reference');
            $table->foreignId('order_id')->nullable()->constrained('orders')->onDelete('set null');
            $table->timestamps();
            $table->index('user_id');
            $table->index('created_at');
        });

        // Payments Table
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->integer('amount'); // in Naira
            $table->enum('payment_method', ['paystack', 'bank_transfer', 'wallet']);
            $table->string('reference_id')->nullable(); // from payment gateway
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');
            $table->text('response_data')->nullable(); // Store payment gateway response
            $table->timestamps();
            $table->index('order_id');
            $table->index('buyer_id');
            $table->index('status');
        });

        // Ratings/Reviews Table
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('reviewer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('reviewee_id')->constrained('users')->onDelete('cascade');
            $table->integer('rating'); // 1-5 stars
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->unique(['order_id', 'reviewer_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('ratings');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
        Schema::dropIfExists('saved_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('listings');
        Schema::dropIfExists('users');
    }
}
