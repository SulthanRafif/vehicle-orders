<?php

use App\Enums\RoleType;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleOrderController;
use App\Http\Controllers\VehicleOrderStatusController;
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
    Route::get('/vehicle-orders', [VehicleOrderController::class, 'index'])->name('vehicle-orders.index');
    Route::put('/vehicle-orders/{vehicle_order}/update-approval-status', [VehicleOrderController::class, 'updateApprovalStatus'])->name('vehicle-orders.update-approval-status');

    // Drivers
    Route::get('/drivers', [DriverController::class, 'index'])->name('drivers.index');

    // Vehicle
    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');

    // ADMIN //
    Route::middleware(['role:' . RoleType::ADMIN])->group(function () {
        // Users
        Route::resource('/users', UserController::class)->except('show');

        // Vehicle Orders Export Excel
        Route::get('/vehicle-orders/export', [VehicleOrderController::class, 'export'])->name('vehicle-orders.export');

        // Vehicles
        Route::get('/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create');
        Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
        Route::put('/vehicles/{vehicle}', [VehicleController::class, 'update'])->name('vehicles.update');
        Route::get('/vehicles/{vehicle}/edit', [VehicleController::class, 'edit'])->name('vehicles.edit');
        Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy'])->name('vehicles.destroy');

        // Drivers
        Route::get('/drivers/create', [DriverController::class, 'create'])->name('drivers.create');
        Route::post('/drivers', [DriverController::class, 'store'])->name('drivers.store');
        Route::put('/drivers/{driver}', [DriverController::class, 'update'])->name('drivers.update');
        Route::get('/drivers/{driver}/edit', [DriverController::class, 'edit'])->name('drivers.edit');
        Route::delete('/drivers/{driver}', [DriverController::class, 'destroy'])->name('drivers.destroy');

        // Vehicle Order Statuses
        Route::get('/vehicle-order-statuses', [VehicleOrderStatusController::class, 'index'])->name('vehicle-order-statuses.index');
        Route::put('/vehicle-order-statuses/{vehicle_order}/update-return-status', [VehicleOrderStatusController::class, 'updateReturnStatus'])->name('vehicle-order-statuses.update-return-status');

        // Vehicle Orders
        Route::get('/vehicle-orders/create', [VehicleOrderController::class, 'create'])->name('vehicle-orders.create');
        Route::post('/vehicle-orders', [VehicleOrderController::class, 'store'])->name('vehicle-orders.store');
        Route::put('/vehicle-orders/{vehicle_order}', [VehicleOrderController::class, 'update'])->name('vehicle-orders.update');
        Route::get('/vehicle-orders/{vehicle_order}/edit', [VehicleOrderController::class, 'edit'])->name('vehicle-orders.edit');
        Route::delete('/vehicle-orders/{vehicle_order}', [VehicleOrderController::class, 'destroy'])->name('vehicle-orders.destroy');
    });
});
