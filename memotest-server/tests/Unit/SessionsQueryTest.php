<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Session;
use Database\Factories\SessionFactory;

class SessionsQueryTest extends TestCase {
    public function testSessionsQuery(): void {
        SessionFactory::new()->create();

        $response = $this->graphQL('
            {
                sessions {
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
                'sessions' => [
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
