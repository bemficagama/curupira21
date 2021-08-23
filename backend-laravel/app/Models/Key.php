<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    protected $table = 'keys';
    protected $primaryKey = 'id';
    protected $hidden = ['categories'];

    public $fillable = ['id', 'key', 'categories'];

    public function rules()
    {
        return [
            'key' => 'required',
        ];
    }

    public function save(array $options = [])
    {
        $categoryIds = $options['categoryIds'];

        // before save code
        parent::save($options);
        // after save code

        $this->categories()->sync($categoryIds);

    }

    public function delete(array $options = [])
    {
        $this->categories()->detach();
        // before delete code
        parent::delete($options);
        // after delete code
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'key_category');
    }

    public function categoryIds()
    {
        $this->categories;

        $ids = array();
        foreach ($this->categories as $key => $category) {
            $ids[] = "{$category->id}";
        }
        $this->attributes['categoryIds'] = $ids;
    }

    /**
     * Search Key
     *
     * @param string $arg
     * @param int $perPage
     * @param int $main_category
     *
     * @return keys[]
     */
    static public function search($arg, $perPage = 4, $main_category = 0)
    {
        if ($main_category == 0) {
            return Key::where('key', 'like', '%' . $arg . '%')
                ->paginate($perPage);
        }

        $category = Category::find($main_category);
        return $category->belongsToMany(
            Key::class,
            'key_category'
        )->where('key', 'like', '%' . $arg . '%')->paginate($perPage);
    }
}
