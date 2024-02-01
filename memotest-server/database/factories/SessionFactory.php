<?php

namespace Database\Factories;

use App\Models\Session;
use Illuminate\Database\Eloquent\Factories\Factory;

class SessionFactory extends Factory {
    protected $model = Session::class;

    public function definition() {
        return [
            'memotestId' => function () {
                return \App\Models\Memotest::factory()->create()->id;
            },
            'retries' => $this->faker->randomNumber(),
            'numberOfPairs' => $this->faker->randomNumber(),
            'state' => 'STARTED',
            'score' => $this->faker->randomNumber(),
            'gameState' => [],
        ];
    }
}
