<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $table = 'categories';
    protected $primaryKey = 'id';

    protected $fillable = ['id', 'name', 'description', 'parent_id'];

    public function rules()
    {
        return [
            'name' => 'required',
            'description' => 'required',
        ];
    }

    function category()
    {
        return $this->belongsTo('App\Category');
    }
}
