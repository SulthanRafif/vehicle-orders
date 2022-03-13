<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FileUploadController extends Controller
{
    public function create()
    {
        return Inertia::render('FileUploads/Create');
    }

    public function store(Request $request)
    {
        dd($request->all());
    }
}
