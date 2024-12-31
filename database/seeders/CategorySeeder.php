<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()->createMany([
            ['id' => 1, 'name' => "Uncategorized"],
            ['id' => 2, 'name' => "Skin Care"],
            ['id' => 3, 'name' => "Make Up"]
        ]);
    }
}
