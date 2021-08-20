<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    protected $table = 'keys';
    protected $primaryKey = 'id';

    public $fillable = ['id', 'key', 'categories1'];

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

        $this->attributes['categories'] = $categoriesId;
    }

    public function save(array $options = [])
    {
        $categories = $this->categories;
        error_log(implode("|",$categories));
        unset($this->attributes['categories']);
        // before save code
        parent::save($options);
        // after save code
        $this->getCategoriesId();
        $insert = array_diff($categories, $this->categories);

        if (!empty($insert)) {
            foreach ($insert as $id) {
                $keyHasCategories = new KeyHasCategories();
                $keyHasCategories->key_id = $this->id;
                $keyHasCategories->category_id = "{$id}";
                $keyHasCategories->save();
            }
        }

        $delete = array_diff($this->categories, $categories);

        if (!empty($delete)) {
            foreach ($delete as $id) {
                $keyHasCategories = KeyHasCategories::where(['category_id' => $id, 'key_id' => $this->id]);
                $keyHasCategories->delete();
            }
        }
    }

    public function delete(array $options = [])
    {
        $this->getCategoriesId();
        $categories = $this->categories;
        foreach ($categories as $key => $id) {
            $keyHasCategories = KeyHasCategories::where(['category_id' => $id, 'key_id' => $this->id]);
            $keyHasCategories->delete();
        }
        // before delete code
        parent::delete($options);
        // after delete code
    }
}
