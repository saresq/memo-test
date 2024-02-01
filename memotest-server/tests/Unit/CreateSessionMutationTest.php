<?php

namespace Tests\Unit;

use Tests\TestCase;

class CreateSessionMutationTest extends TestCase {
    public function testCreateSessionMutation(): void {
        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->postGraphQL([
            'query' => '
                mutation {
                    createSession(memotestId: 1, numberOfPairs: 8) {
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
            ',
        ]);

        $response->assertJsonStructure([
            'data' => [
                'createSession' => [
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
        ])->assertJsonFragment([
            'memotestId' => 1,
            'numberOfPairs' => 8,
            'state' => 'STARTED',
        ]);

    }
}
