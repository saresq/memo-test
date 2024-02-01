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
        $usedIds = [];
        for ($i = 0; $i < 4; $i++) {
            do {
                $randomId = rand(10, 30);
            } while (in_array($randomId, $usedIds));
            $usedIds[] = $randomId;

            $urls[] = "https://picsum.photos/id/{$randomId}/200/300";
        }


        return [
            'name' => $this->faker->word(),
            'images' => $urls,
        ];
    }
}
