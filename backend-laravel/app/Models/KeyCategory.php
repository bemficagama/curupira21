<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeyCategory extends Model
{
    use HasFactory;

    protected $table = 'key_category';

    public $fillable = ['key_id', 'category_id'];
}
