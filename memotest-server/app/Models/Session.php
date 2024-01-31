<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    const STATUS_STARTED = 'STARTED';
    const STATUS_COMPLETED = 'COMPLETED';
    const STATUS_CANCELED = 'CANCELED';

    use HasFactory;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'gameState' => 'array',
    ];
}
