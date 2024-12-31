<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create(
            [
                'id' => 1,
                'role_id' => 1,
                'name' => "Super Admin",
                'email' => "superadmin@gmail.com",
                'email_verified_at' => now(),
                'password' => Hash::make('ScarletNight'),
                'remember_token' => Str::random(10),
            ],
        );

        User::factory()->create(
            [
                'id' => 2,
                'role_id' => 2,
                'name' => "Lintang Ardila",
                'email' => "influencer@gmail.com",
                'email_verified_at' => now(),
                'password' => Hash::make('LightOfDawn'),
                'remember_token' => Str::random(10),
            ],
        );

        User::factory()->create(
            [
                'id' => 3,
                'role_id' => 3,
                'name' => "John Doe",
                'email' => "john.doe@gmail.com",
                'email_verified_at' => now(),
                'password' => Hash::make('MidnightPhantasm'),
                'remember_token' => Str::random(10),
            ],
        );
    }
}
