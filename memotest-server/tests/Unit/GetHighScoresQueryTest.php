<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Session;
use Database\Factories\SessionFactory;

class GetHighScoresQueryTest extends TestCase {
    public function testGetHighScoresQuery(): void {
        SessionFactory::new()->create(['score' => 100]);
        SessionFactory::new()->create(['score' => 90]);
        SessionFactory::new()->create(['score' => 80]);

        $response = $this->graphQL('
            {
                getHighScores {
                    id
                    memotestId
                    retries
                    numberOfPairs
                    state
                    score
                    created_at
                    updated_at
                    gameState
                }
            }
        ');

        $response->assertJsonStructure([
            'data' => [
                'getHighScores' => [
                    '*' => [
                        'id',
                        'memotestId',
                        'retries',
                        'numberOfPairs',
                        'state',
                        'score',
                        'created_at',
                        'updated_at',
                        'gameState',
                    ]
                ]
            ]
        ]);
    }
}
