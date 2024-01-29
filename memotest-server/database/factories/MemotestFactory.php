<?php

namespace Database\Factories;

use App\Models\Memotest;
use Illuminate\Database\Eloquent\Factories\Factory;

class MemotestFactory extends Factory
{
    protected $model = Memotest::class;

    public function definition()
    {
        $urls = [];
        $randomId = rand(1, 1000);
        for ($i = 0; $i < 4; $i++) {
            $urls[] = "https://picsum.photos/id/{$randomId}/200/300";
        }

        return [
            'name' => $this->faker->word(),
            'images' => $urls,
        ];
    }
}
