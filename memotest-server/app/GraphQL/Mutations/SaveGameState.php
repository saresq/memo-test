<?php

namespace App\GraphQL\Mutations;

use App\Models\Session;

class SaveGameState {

    public function __invoke($rootValue, array $args): Session {

        $session = Session::findOrFail($args['id']);

        if (!isset($args['gameState']) || !is_array($args['gameState'])) {
            throw new \InvalidArgumentException("Invalid gameState provided.");
        }

        $session->gameState = $args['gameState'];
        $session->save();

        return $session;
    }
}
