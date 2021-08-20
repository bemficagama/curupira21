<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeyHasCategories extends Model
{
    use HasFactory;

    public $fillable = ['key_id', 'category_id'];
}
