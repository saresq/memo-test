<?php

namespace Tests\Unit;

use Tests\TestCase;

use App\Models\Memotest;
use Database\Factories\MemotestFactory;

class MemotestsQueryTest extends TestCase {
    public function testMemotestsQuery(): void {
        MemotestFactory::new()->count(3)->create();

        $response = $this->graphQL('
            {
                memotests {
                    id
                    name
                    images
                    created_at
                    updated_at
                }
            }
        ');

        $response->assertJsonStructure([
            'data' => [
                'memotests' => [
                    '*' => [
                        'id',
                        'name',
                        'images',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]
        ]);

    }

}
