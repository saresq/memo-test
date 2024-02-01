<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Session;
use Database\Factories\SessionFactory;

class SaveGameStateMutationTest extends TestCase {
    public function testSaveGameStateMutation(): void {
        $session = SessionFactory::new()->create([
            'gameState' => ['card1', 'card2', 'card3'], // Example initial game state
        ]);

        $newGameState = ['card3', 'card1', 'card4']; // Example new game state

        $response = $this->graphQL("
            mutation {
                saveGameState(id: $session->id, gameState: ". json_encode($newGameState) .") {
                    id
                    gameState
                }
            }
        ");

        $response->assertJsonStructure([
            'data' => [
                'saveGameState' => [
                    'id',
                    'gameState',
                ]
            ]
        ]);

        $session->refresh();

        $this->assertEquals($session->id, $response->json('data.saveGameState.id'));
        $this->assertEquals($newGameState, $session->gameState);
    }
}
