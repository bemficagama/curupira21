<?php

namespace App\Models;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    protected $categories = [];

    protected $table = 'keys';
    protected $primaryKey = 'id';

    public $fillable = ['id', 'key'];

    public function rules()
    {
        return [
            'key' => 'required',
        ];
    }

    function getCategoriesId()
    {
        $categories = DB::table('key_has_categories')->select('category_id')->where('key_id', '=', $this->id)->get();
        $categoriesId = [];
        foreach ($categories as $key => $category) {
            $categoriesId[] = "{$category->category_id}";
        }

        return $categoriesId;
    }
}
