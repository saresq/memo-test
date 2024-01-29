<?php

namespace App\GraphQL\Mutations;

use App\Models\Session;

class EndSession {

    public function __invoke($rootValue, array $args): Session {

        $session = Session::findOrFail($args['id']);

        $session->retries = $args['retries'];
        $session->score = (int)$this->calculateScore($session->numberOfPairs, $session->retries);
        $session->save();

        return $session;
    }

    private function calculateScore(int $numberOfPairs, int $retries): int {
        // Calculate the score as per your formula
        return ($numberOfPairs / $retries) * 100;
    }
}
