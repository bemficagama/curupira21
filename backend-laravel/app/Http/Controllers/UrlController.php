<?php

namespace App\Http\Controllers;

use App\Models\Url;
use App\Models\Category;
use Illuminate\Http\Request;

class UrlController extends Controller
{
    public function __construct(Url $url)
    {
        $this->url = $url;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $urls = array();
        $urls = Url::search($request->search, $request->perPage, $request->main_category);

        return response()->json($urls, 200);
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

        $request->validate($this->url->rules());

        $url = new Url();
        $url->url = $request->url;
        $url->save(['categoryIds' => $categoryIds]);

        return response()->json($url, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Url  $url
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $url_ = $this->url->find($id);

        if ($url_ === null) {
            return response()->json(['erro' => 'Recurso pesquisado não existe'], 404);
        }

        $url_->categoryIds();

        return response()->json($url_, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Url  $url
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $categoryIds = array();
        if (is_array($request->categoryIds)) {
            $categoryIds = $request->categoryIds;
        }

        $url = $this->url->find($id);

        if ($url === null) {
            return response()->json(['erro' => 'Impossível realizar a atualização. O recurso solicitado não existe'], 404);
        }

        if ($request->method() === 'PATCH') {

            $regrasDinamicas = array();

            //percorrendo todas as regras definidas no Model
            foreach ($url->rules() as $input => $regra) {

                //coletar apenas as regras aplicáveis aos parâmetros parciais da requisição PATCH
                if (array_key_exists($input, $request->all())) {
                    $regrasDinamicas[$input] = $regra;
                }
            }

            $request->validate($regrasDinamicas);
        } else {
            $request->validate($url->rules());
        }

        $url->fill($request->all());
        $url->save(['categoryIds' => $categoryIds]);

        return response()->json($url, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Url  $url
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $url = $this->url->find($id);

        if ($url === null) {
            return response()->json(['erro' => 'Impossível realizar a exclusão. O recurso solicitado não existe'], 404);
        }

        $url->delete();
        return response()->json(['msg' => 'O registro foi removido com sucesso!'], 200);
    }
}
