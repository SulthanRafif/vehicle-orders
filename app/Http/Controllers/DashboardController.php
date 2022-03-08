<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $results = [];

        return Inertia::render('Dashboard/Index', [
            'results' => $results
        ]);
    }
}
