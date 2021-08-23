<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UrlCategory extends Model
{
    use HasFactory;

    protected $table = 'url_category';

    public $fillable = ['url_id', 'category_id'];
}
