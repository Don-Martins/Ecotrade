# EcoTrade Backend - Laravel API Setup Guide

## Project Setup

### Installation
```bash
composer create-project laravel/laravel ecotrade-api
cd ecotrade-api
```

### Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

### Database Configuration
Update `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecotrade
DB_USERNAME=root
DB_PASSWORD=
```

## Database Schema Overview

### Tables Structure:

#### 1. users
- id (PK)
- name
- email (unique)
- password
- phone
- role (enum: buyer, seller, admin)
- business_name (nullable for non-sellers)
- address
- avatar_url
- email_verified_at
- created_at, updated_at

#### 2. listings
- id (PK)
- seller_id (FK → users)
- title
- description
- material_type
- quantity (kg)
- price_per_kg
- location
- image_urls (JSON)
- status (enum: active, pending, sold)
- views_count
- created_at, updated_at

#### 3. orders
- id (PK)
- buyer_id (FK → users)
- seller_id (FK → users)
- listing_id (FK → listings)
- quantity
- total_price
- status (enum: pending, paid, shipped, delivered, disputed, completed)
- payment_method
- delivery_address
- created_at, updated_at

#### 4. saved_items
- id (PK)
- buyer_id (FK → users)
- listing_id (FK → listings)
- created_at

#### 5. conversations
- id (PK)
- buyer_id (FK → users)
- seller_id (FK → users)
- last_message_id (FK → messages, nullable)
- created_at, updated_at

#### 6. messages
- id (PK)
- conversation_id (FK → conversations)
- sender_id (FK → users)
- receiver_id (FK → users)
- content
- attachment_url (nullable)
- read_at (nullable)
- created_at

#### 7. wallet_transactions
- id (PK)
- user_id (FK → users)
- amount
- type (enum: credit, debit)
- reference
- order_id (FK → orders, nullable)
- created_at

#### 8. payments
- id (PK)
- order_id (FK → orders)
- buyer_id (FK → users)
- seller_id (FK → users)
- amount
- payment_method (enum: paystack, bank_transfer, wallet)
- reference_id (from payment gateway)
- status (enum: pending, completed, failed, refunded)
- created_at, updated_at

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- POST /api/auth/refresh - Refresh token

### Users
- GET /api/users/:id - Get user profile
- PUT /api/users/:id - Update profile
- GET /api/users/:id/wallet - Get wallet balance
- GET /api/users/:id/ratings - Get user ratings

### Listings
- GET /api/listings - Get all listings (with filters)
- GET /api/listings/:id - Get listing details
- POST /api/listings - Create new listing (seller)
- PUT /api/listings/:id - Update listing (seller)
- DELETE /api/listings/:id - Delete listing (seller)
- GET /api/listings/:id/inquiries - Get inquiries for listing

### Orders
- GET /api/orders - Get user orders
- GET /api/orders/:id - Get order details
- POST /api/orders - Create order
- PUT /api/orders/:id/status - Update order status
- GET /api/orders/:id/tracking - Get order tracking

### Messages
- GET /api/conversations - Get user conversations
- GET /api/conversations/:id/messages - Get conversation messages
- POST /api/conversations/:id/messages - Send message
- PUT /api/conversations/:id/mark-read - Mark as read

### Payments
- POST /api/payments/initiate - Initiate payment
- POST /api/payments/verify - Verify payment (webhook)
- GET /api/payments - Payment history

### Admin
- GET /api/admin/users - List all users
- GET /api/admin/listings - Manage listings
- GET /api/admin/orders - View all orders
- GET /api/admin/payments - View payment transactions
- GET /api/admin/analytics - Platform analytics

## Middleware

### Required Middleware:
- `auth:sanctum` - Authentication check
- `verified` - Email verification check
- `role:seller|buyer|admin` - Role-based access control
- `api.key` - API key validation for external integrations

## Seeders

Run seeders to populate mock data:
```bash
php artisan db:seed
```

Seeders include:
- UserSeeder - Create test users
- ListingSeeder - Create sample listings
- OrderSeeder - Create sample orders

## Running the Application

```bash
# Run migrations
php artisan migrate

# Run seeders
php artisan db:seed

# Start server
php artisan serve
```

The API will be available at: `http://localhost:8000/api`

## Key Dependencies

- laravel/sanctum - API authentication
- laravel/tinker - REPL for debugging
- predis/predis - Redis client (for caching)

## CORS Configuration

Update `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

## Environment Variables

```
APP_NAME=EcoTrade
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=ecotrade
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173,localhost:3000

PAYSTACK_PUBLIC_KEY=your_paystack_key
PAYSTACK_SECRET_KEY=your_paystack_secret

FRONTEND_URL=http://localhost:5173
```
