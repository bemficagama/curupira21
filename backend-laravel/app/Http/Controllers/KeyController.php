<?php

namespace App\Http\Controllers;

use App\Models\Key;
use App\Models\Category;
use Illuminate\Http\Request;

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
        $keys = array();
        $keys = Key::search($request->search, $request->perPage, $request->main_category);

        return response()->json($keys, 200);
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
        $categoryIds = array();
        if (is_array($request->categoryIds)) {
            $categoryIds = $request->categoryIds;
        }

        $request->validate($this->key->rules());

        $key = new Key();
        $key->key = $request->key;
        $key->save(['categoryIds' => $categoryIds]);

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
        $key_ = $this->key->find($id);

        if ($key_ === null) {
            return response()->json(['erro' => 'Recurso pesquisado não existe'], 404);
        }

        $key_->categoryIds();

        return response()->json($key_, 200);
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
        $categoryIds = array();
        if (is_array($request->categoryIds)) {
            $categoryIds = $request->categoryIds;
        }

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
        $key->save(['categoryIds' => $categoryIds]);

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
