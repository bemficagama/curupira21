<?php

namespace App\Http\Controllers;

use App\Models\Key;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KeyController extends Controller
{
    public function __construct(Key $key)
    {
        $this->key = $key;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $key = Key::where('key', 'like', '%' . $request->search . '%')
            ->where(function ($query) use ($request) {
                //$query->where('parent_id', '=', $request->parent_id)
                $query->orWhereRaw(($request->parent_id == 0 ? 'true' : 'false'));
            })
            ->paginate($request->perPage)->withPath($request->path);
        return response()->json($key, 200);
    }

    public function mains(Request $request)
    {
        $category = Category::whereNull('parent_id')->get();
        return response()->json($category, 200);
    }

    public function categories(Request $request)
    {
        $category = Category::get();
        return response()->json($category, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $categories = array();
        $categories = $request->categories;

        $request->validate($this->key->rules());

        $key = $this->key->create([
            'key' => $request->key,
        ]);

        if (!empty($categories)) {
            $rows = array();
            foreach ($categories as $category) {
                $rows[] = [ 'key_id' =>  $key->id, 'category_id' => $category ];
            }

            DB::table('key_has_categories')->insert($rows);
        }

        return response()->json($key, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $key = $this->key->find($id);
        if ($key === null) {
            return response()->json(['erro' => 'Recurso pesquisado não existe'], 404);
        }

        return response()->json($key, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $key = $this->key->find($id);

        if ($key === null) {
            return response()->json(['erro' => 'Impossível realizar a atualização. O recurso solicitado não existe'], 404);
        }

        if ($request->method() === 'PATCH') {

            $regrasDinamicas = array();

            //percorrendo todas as regras definidas no Model
            foreach ($key->rules() as $input => $regra) {

                //coletar apenas as regras aplicáveis aos parâmetros parciais da requisição PATCH
                if (array_key_exists($input, $request->all())) {
                    $regrasDinamicas[$input] = $regra;
                }
            }

            $request->validate($regrasDinamicas);
        } else {
            $request->validate($key->rules());
        }

        $key->fill($request->all());
        $key->save();

        return response()->json($key, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Key  $key
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $key = $this->key->find($id);

        if ($key === null) {
            return response()->json(['erro' => 'Impossível realizar a exclusão. O recurso solicitado não existe'], 404);
        }

        $key->delete();
        return response()->json(['msg' => 'O registro foi removido com sucesso!'], 200);
    }
}
