<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Session;
use Database\Factories\SessionFactory;

class EndSessionMutationTest extends TestCase {
    public function testEndSessionMutation(): void {
        $numberOfPairs = 8;
        $retries = 3;
        $expectedScore = 266;

        $session = SessionFactory::new()->create([
            'state' => Session::STATUS_STARTED,
            'numberOfPairs' => $numberOfPairs,
            'retries' => $retries,
        ]);

        $response = $this->graphQL("
            mutation {
                endSession(id: $session->id) {
                    id
                    state
                    score
                }
            }
        ");

        $response->assertJsonStructure([
            'data' => [
                'endSession' => [
                    'id',
                    'state',
                    'score',
                ]
            ]
        ]);

        $response->assertJsonFragment([
            'state' => Session::STATUS_COMPLETED,
        ]);

        $response->assertJsonFragment([
            'score' => $expectedScore,
        ]);

        $session->refresh();

        $this->assertEquals(Session::STATUS_COMPLETED, $session->state);
        $this->assertEquals($expectedScore, $session->score);
    }
}
