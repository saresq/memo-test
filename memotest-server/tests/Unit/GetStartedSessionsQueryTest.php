<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Session;
use Database\Factories\SessionFactory;

class GetStartedSessionsQueryTest extends TestCase {
    public function testGetStartedSessionsQuery(): void {
        SessionFactory::new()->count(3)->create(['state' => Session::STATUS_STARTED]);

        $response = $this->graphQL('
            {
                getStartedSessions {
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
                'getStartedSessions' => [
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
