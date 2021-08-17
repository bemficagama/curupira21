<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{

    protected $table = 'urls';
    protected $primaryKey = 'id';

    protected $fillable = ['id', 'url'];

    public function rules()
    {
        return [
            'url' => 'required',
        ];
    }

    function categories()
    {
        return $this->hasMany(Castegory::class);
    }
}
