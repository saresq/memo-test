<?php

namespace App\GraphQL\Mutations;

use App\Models\Session;

class CreateSession {
    public function __invoke($rootValue, array $args): Session {

        // Cancel sessions with the same memotestId and status STARTED
        Session::where('memotestId', $args['memotestId'])
               ->where('state', Session::STATUS_STARTED)
               ->update(['state' => Session::STATUS_CANCELED]);

        $session = new Session();
        $session->memotestId = $args['memotestId'];
        $session->numberOfPairs = $args['numberOfPairs'];
        $session->retries = 0;
        $session->score = 0;
        $session->gameState = [];
        $session->state = Session::STATUS_STARTED;
        $session->save();

        return $session;
    }
}
