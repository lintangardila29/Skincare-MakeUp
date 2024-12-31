<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::factory()->createMany([
            [
                'id' => 1,
                'name' => "Super Admin",
            ],
            [
                'id' => 2,
                'name' => "Influencer",
            ],
            [
                'id' => 3,
                'name' => "Customer",
            ],
        ]);

        $this->call([
            UserSeeder::class,
            BrandSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
