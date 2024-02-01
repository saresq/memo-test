<?php

namespace Tests\Unit;

use Tests\TestCase;

use App\Models\Session;
use Database\Factories\SessionFactory;

class UpdateSessionMutationTest extends TestCase {
    public function testUpdateSessionMutation(): void {

        $retries = 5;
        $session = SessionFactory::new()->create([
            'retries' => $retries,
        ]);

        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->postGraphQL([
            'query' => '
                mutation {
                    updateSession(id: ' . $session->id . ', retries: '. $retries .') {
                        id
                        retries
                    }
                }
            ',
        ]);

        $response->assertJsonStructure([
            'data' => [
                'updateSession' => [
                    'id',
                    'retries',
                ]
            ]
        ])->assertJsonFragment([
            'id' => (string) $session->id,
            'retries' => $retries,
        ]);


    }
}
