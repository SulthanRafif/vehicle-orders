<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'approval_one',
        'approval_two',
        'created_by',
        'updated_by',
        'order_date',
        'customer_name',
        'driver_id',
        'approval_one_status',
        'approval_two_status',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function approvalOne()
    {
        return $this->belongsTo(User::class, 'approval_one');
    }

    public function approvalTwo()
    {
        return $this->belongsTo(User::class, 'approval_two');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeSearch(Builder $query, $search)
    {
        return $query->when(!empty($search), function (Builder $query) use ($search) {
            return $query
                ->where('customer_name', 'like', "%{$search}%")
                ->orWhere('driver_name', 'like', "%{$search}%")
                ->orWhereHas('vehicle', function (Builder $query) use ($search) {
                    return $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('createdBy', function (Builder $query) use ($search) {
                    return $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('approvalOne', function (Builder $query) use ($search) {
                    return $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('approvalTwo', function (Builder $query) use ($search) {
                    return $query->where('name', 'like', "%{$search}%");
                });
        });
    }

    public function scopeFilterByOrderDate(Builder $query, $date)
    {
        return $query->when(!empty($date), function (Builder $query) use ($date) {
            return $query->whereDate('order_date', $date);
        });
    }
}
