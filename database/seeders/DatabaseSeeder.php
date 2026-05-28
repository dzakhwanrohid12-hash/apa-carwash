<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\ServiceCategory;
use App\Models\Service;
use App\Models\OperationalSetting;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@apacarwash.com',
            'phone' => '081234567890',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'name' => 'Kasir Utama',
            'email' => 'kasir@apacarwash.com',
            'phone' => '081234567891',
            'role' => 'kasir',
            'password' => bcrypt('password'),
        ]);

        $catMobil = ServiceCategory::create([
            'name' => 'Mobil',
            'slug' => Str::slug('Mobil'),
            'icon' => 'Car',
        ]);

        $catMotor = ServiceCategory::create([
            'name' => 'Motor',
            'slug' => Str::slug('Motor'),
            'icon' => 'Bike',
        ]);

        $catKarpet = ServiceCategory::create([
            'name' => 'Karpet',
            'slug' => Str::slug('Karpet'),
            'icon' => 'Rug',
        ]);

        $services = [
            ['service_category_id'=>$catMobil->id,'name'=>'Mobil Kecil/LCGC','price'=>40000,'duration_minutes'=>60],
            ['service_category_id'=>$catMobil->id,'name'=>'Mobil Menengah','price'=>45000,'duration_minutes'=>60],
            ['service_category_id'=>$catMobil->id,'name'=>'Mobil Besar/Double Kabin','price'=>50000,'duration_minutes'=>60],
            ['service_category_id'=>$catMobil->id,'name'=>'Promo Taksi Online','price'=>35000,'duration_minutes'=>60],
            ['service_category_id'=>$catMotor->id,'name'=>'Cuci Motor Regular','price'=>15000,'duration_minutes'=>30],
            ['service_category_id'=>$catKarpet->id,'name'=>'Karpet Kecil','price'=>30000,'duration_minutes'=>30],
            ['service_category_id'=>$catKarpet->id,'name'=>'Karpet Sedang','price'=>40000,'duration_minutes'=>30],
            ['service_category_id'=>$catKarpet->id,'name'=>'Karpet Besar (3x4)','price'=>50000,'duration_minutes'=>30],
            ['service_category_id'=>$catKarpet->id,'name'=>'Karpet XL (4x6)','price'=>80000,'duration_minutes'=>30],
        ];

        foreach ($services as $svc) {
            Service::create([
                ...$svc,
                'is_active' => true,
            ]);
        }

        OperationalSetting::insert([
            [
                'key'=>'open_time',
                'value'=>'07:30',
                'description'=>'Jam Buka',
            ],
            [
                'key'=>'close_time',
                'value'=>'18:00',
                'description'=>'Jam Tutup',
            ],
            [
                'key'=>'slot_duration_minutes',
                'value'=>'60',
                'description'=>'Durasi Per Slot Reservasi',
            ],
        ]);
    }
}
