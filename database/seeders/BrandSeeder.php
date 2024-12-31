<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::factory()->createMany([
            [
                'id' => 1,
                'name' => "The Ordinary",
                'logo' => "logos/the-ordinary.png",
                'website' => "https://theordinary.deciem.com/",
                'description' => "The Ordinary is a brand focused on advanced functional beauty. The Ordinary exists to bring integrity, more effective products and honourable prices to the market."
            ],
            [
                'id' => 2,
                'name' => "CeraVe",
                'logo' => "logos/cerave.png",
                'website' => "https://www.cerave.com/",
                'description' => "CeraVe is a skincare brand that offers a range of products that contain essential ceramides and hyaluronic acid to help restore the skin’s protective barrier."
            ],
            [
                'id' => 3,
                'name' => "The Inkey List",
                'logo' => "logos/the-inkey-list.png",
                'website' => "https://www.theinkeylist.com/",
                'description' => "The Inkey List is a brand that offers simple, single-ingredient skincare products at affordable prices."
            ],
            [
                'id' => 4,
                'name' => "L'Oréal Paris",
                'logo' => "logos/loreal-paris.png",
                'website' => "https://www.lorealparisusa.com/",
                'description' => "L'Oréal Paris is a brand that offers a range of skincare, haircare, and makeup products."
            ],
            [
                'id' => 5,
                'name' => 'La Roche-Posay',
                'logo' => 'logos/la-roche-posay.png',
                'website' => 'https://www.laroche-posay.us/',
                'description' => 'La Roche-Posay is a brand that offers a range of skincare products for sensitive skin.'
            ]
        ]);
    }
}
