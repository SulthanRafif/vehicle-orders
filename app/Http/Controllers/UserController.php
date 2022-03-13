<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\User\UserEditResource;
use App\Http\Resources\User\UserIndexResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::search($request->search)->orderByDesc('id')->paginate();

        return Inertia::render('Users/Index', [
            'propSearch' => $request->search,
            'users' => UserIndexResource::collection($users),
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'roles' => Role::all()
                ->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' =>  Str::title(Str::replace('_', ' ', $role->name))
                    ];
                })
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $password  = ['password' => bcrypt($request->password)];
            $user = User::create(array_merge($request->only('name', 'email'), $password));
            $user->syncRoles($request->role_id);

            return $user;
        });

        return redirect()
            ->route('users.index')
            ->with('success', 'Data berhasil di tambahkan.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserEditResource($user),
            'roles' => Role::all()
                ->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => Str::title(Str::replace('_', ' ', $role->name))
                    ];
                })
        ]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $attr_password = [];
        if ($request->has('password') && $request->password) {
            $attr_password = ['password' => bcrypt($request->password)];
        }

        DB::transaction(function () use ($request, $user, $attr_password) {
            $user->update(array_merge($request->only('name', 'email'), $attr_password));
            $user->syncRoles($request->role_id);

            return $user;
        });

        return redirect()
            ->route('users.index')
            ->with('success', 'Data Berhasil di Perbaharui');
    }

    public function destroy(User $user)
    {
        DB::transaction(function () use ($user) {
            $user->roles()->detach();
            $user->delete();
        });

        return redirect()
            ->route('users.index')
            ->with('success', 'Data berhasil di hapus.');
    }
}
