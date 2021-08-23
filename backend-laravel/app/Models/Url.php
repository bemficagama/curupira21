<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    protected $table = 'urls';
    protected $primaryUrl = 'id';
    protected $hidden = ['categories'];

    public $fillable = ['id', 'url', 'categories'];

    public function rules()
    {
        return [
            'url' => 'required',
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
        return $this->belongsToMany(Category::class, 'url_category');
    }

    public function categoryIds()
    {
        $this->categories;

        $ids = array();
        foreach ($this->categories as $url => $category) {
            $ids[] = "{$category->id}";
        }
        $this->attributes['categoryIds'] = $ids;
    }

    /**
     * Search Url
     *
     * @param string $arg
     * @param int $perPage
     * @param int $main_category
     *
     * @return urls[]
     */
    static public function search($arg, $perPage = 4, $main_category = 0)
    {
        if ($main_category == 0) {
            return Url::where('url', 'like', '%' . $arg . '%')
                ->paginate($perPage);
        }

        $category = Category::find($main_category);
        return $category->belongsToMany(
            Url::class,
            'url_category'
        )->where('url', 'like', '%' . $arg . '%')->paginate($perPage);
    }
}
