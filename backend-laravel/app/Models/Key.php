<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{

    protected $table = 'keys';
    protected $primaryKey = 'id';

    protected $fillable = ['id', 'key'];

    public function rules()
    {
        return [
            'key' => 'required',
        ];
    }

    function categories()
    {
        return $this->hasMany(Castegory::class);
    }
}
