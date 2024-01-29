<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Memotest;

class MemotestSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Memotest::factory()
            ->count(2)
            ->create();
    }
}
