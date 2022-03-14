<?php

use App\Enums\RoleType;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleOrderController;
use App\Models\VehicleOrder;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ALL USERS //

// Login
Route::get('/login', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store']);

Route::middleware(['auth', 'role:' . RoleType::ADMIN . '|' . RoleType::PENYETUJU_SATU . '|' . RoleType::PENYETUJU_DUA])->group(function () {
    // ALL USERS //

    // Dashboard
    Route::get('/', DashboardController::class)->name('dashboard');

    // Logout
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    // Vehicle Orders
    Route::resource('/vehicle-orders', VehicleOrderController::class)->except('show');
    Route::put('/vehicle-orders/{vehicle_order}/update-approval-status', [VehicleOrderController::class, 'updateApprovalStatus'])->name('vehicle-orders.update-approval-status');

    // File Upload
    Route::get('/file-uploads', [FileUploadController::class, 'create'])->name('file-uploads.create');
    Route::post('/file-uploads', [FileUploadController::class, 'create'])->name('file-uploads.store');

    // ADMIN //
    Route::middleware(['role:' . RoleType::ADMIN])->group(function () {
        // Users
        Route::resource('/users', UserController::class)->except('show');

        // Vehicle Orders Export Excel
        Route::get('/vehicle-orders/export', [VehicleOrderController::class, 'export'])->name('vehicle-orders.export');

        // Vehicles
        Route::resource('/vehicles', VehicleController::class);
    });
});
