<?php

namespace App\GraphQL\Mutations;

use App\Models\Session;

class EndSession {

    public function __invoke($rootValue, array $args): Session {

        $session = Session::findOrFail($args['id']);

        $session->score = (int)$this->calculateScore($session->numberOfPairs, $session->retries);
        $session->state = Session::STATUS_COMPLETED;
        $session->save();

        return $session;
    }

    private function calculateScore(int $numberOfPairs, int $retries): int {
        return ($numberOfPairs / $retries) * 100;
    }
}
