<?php

namespace Sefirosweb\LaravelCronjobs\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjobs;

class CronjobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        // return response()->json(['success' => true, 'data' => AccessList::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\AccessListRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // AccessList::create($request->all());
        // return response()->json(['success' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\AccessListRequest  $request
     * @param  \App\Models\AccessList  $accessList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cronjobs $accessList)
    {
        // $accessList = AccessList::findOrFail($request->id);
        // $accessList->update($request->all());
        // return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccessList  $accessList
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // $accessList = AccessList::findOrFail($request->id);
        // $accessList->delete();
        // return response()->json(['success' => true]);
    }
}
