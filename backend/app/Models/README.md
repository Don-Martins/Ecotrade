# EcoTrade Models

This directory contains all Eloquent models for the EcoTrade API.

## Models Structure

### User.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name', 'email', 'password', 'phone', 'role', 
        'business_name', 'address', 'avatar_url'
    ];

    protected $hidden = ['password', 'remember_token'];

    public function listings()
    {
        return $this->hasMany(Listing::class, 'seller_id');
    }

    public function buyerOrders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }

    public function sellerOrders()
    {
        return $this->hasMany(Order::class, 'seller_id');
    }

    public function savedItems()
    {
        return $this->belongsToMany(Listing::class, 'saved_items');
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function walletTransactions()
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'reviewee_id');
    }

    public function isSeller()
    {
        return $this->role === 'seller';
    }

    public function isBuyer()
    {
        return $this->role === 'buyer';
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function getWalletBalance()
    {
        return $this->walletTransactions()
            ->selectRaw('SUM(CASE WHEN type = "credit" THEN amount ELSE -amount END) as balance')
            ->value('balance') ?? 0;
    }

    public function getAverageRating()
    {
        return $this->ratings()->avg('rating') ?? 0;
    }
}
```

### Listing.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id', 'title', 'description', 'material_type',
        'quantity', 'price_per_kg', 'location', 'image_urls', 'status'
    ];

    protected $casts = [
        'image_urls' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function savedBy()
    {
        return $this->belongsToMany(User::class, 'saved_items');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByMaterialType($query, $type)
    {
        return $query->where('material_type', $type);
    }

    public function scopeSearch($query, $term)
    {
        return $query->whereFullText(['title', 'description'], $term);
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where('location', 'like', "%{$location}%");
    }

    public function incrementViews()
    {
        $this->increment('views_count');
    }

    public function incrementInquiries()
    {
        $this->increment('inquiries_count');
    }
}
```

### Order.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id', 'seller_id', 'listing_id', 'quantity',
        'total_price', 'status', 'payment_method', 'delivery_address'
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function rating()
    {
        return $this->hasOne(Rating::class);
    }

    public function walletTransaction()
    {
        return $this->hasOne(WalletTransaction::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function canBeShipped()
    {
        return $this->status === 'paid';
    }

    public function canBeDisputed()
    {
        return in_array($this->status, ['shipped', 'delivered']);
    }
}
```

### Message.php, Conversation.php, Payment.php, etc.
Similar models following the same pattern with appropriate relationships.

## Key Relationships

- **User** ↔ **Listing** (One-to-Many: Seller has many listings)
- **User** ↔ **Order** (One-to-Many: Buyer/Seller has many orders)
- **Listing** ↔ **Order** (One-to-Many: Listing has many orders)
- **Order** ↔ **Payment** (One-to-One: Order has one payment)
- **User** ↔ **Message** (One-to-Many: User sends/receives messages)
- **User** ↔ **Conversation** (Many-to-Many: through buyer/seller)

## Important Notes

1. Always use `protected $fillable` to specify mass-assignable attributes
2. Define relationships explicitly for eager loading
3. Use query scopes for common filtering operations
4. Implement authorization in policies, not in models
5. Use accessors and mutators for attribute transformations
