<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    const STATUS_STARTED = 'Started';
    const STATUS_COMPLETED = 'Completed';

    use HasFactory;
}
