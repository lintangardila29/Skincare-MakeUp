<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\User;
use App\Models\Category;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user()->isSuperAdmin()) {
            return Redirect::back()->with('error', 'Anda tidak diizinkan melihat User');
        }

        $users = User::orderByDesc('created_at')->get();

        $users->load(['role']);

        return Inertia::render('Dashboard/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->isSuperAdmin()) {
            return Redirect::back()->with('error', 'Anda tidak diizinkan membuat User');
        }

        $roles = Role::get();

        return Inertia::render('Dashboard/Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return Redirect::back()->with('error', 'Anda tidak diizinkan membuat User');
        }

        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'email_verified_at' => 'nullable|date',
        ]);

        if (!$validated) {
            return Redirect::back()->with('error', 'User gagal dibuat');
        }

        $user = User::create([
            'role_id' => $validated['role_id'],
            'name' => $validated['name'],
            'avatar' => 'avatars/default.gif',
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'email_verified_at' => $validated['email_verified_at'],
        ]);

        return Redirect::route('users.index')->with('success', 'User berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return Redirect::back()->with('error', 'Anda tidak diizinkan memperbarui Super Admin');
        }

        $user->load(['role']);

        $roles = Role::get();

        return Inertia::render('Dashboard/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return Redirect::back()->with('error', 'Anda tidak diizinkan memperbarui Super Admin');
        }

        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:2048',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'new_password' => 'nullable|string|min:8',
            'email_verified_at' => 'nullable|date',
        ]);

        if (!$validated) {
            return Redirect::back()->with('error', 'Gagal memperbarui User');
        }

        $user->update([
            'role_id' => $validated['role_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'email_verified_at' => $validated['email_verified_at'],
        ]);

        if ($validated['new_password']) {
            $user->update([
                'password' => Hash::make($validated['new_password']),
            ]);
        }

        return Redirect::route('users.index')->with('success', 'User berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'You are not authorized to delete users'], 403);
        }

        try {
            $user->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'User failed to delete:' + $e], 500);
        }

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function destroyMany(Request $request)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'You are not authorized to delete users'], 403);
        }

        $params = $request->all();

        try {
            User::destroy($params['ids']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Users failed to delete:' + $e], 500);
        }

        return response()->json(['message' => 'Users deleted successfully']);
    }
}
