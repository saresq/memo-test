<?php

declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Session;
use Illuminate\Support\Collection;

final class GetHighScores {
    /**
     * Get the sessions with the highest score for each memotestId from completed sessions.
     *
     * @param  mixed  $rootValue
     * @param  array  $args
     * @return Collection
     */
    public function __invoke($rootValue, array $args): Collection {

        $completedSessions = Session::where('state', Session::STATUS_COMPLETED)->get();

        $sessionsWithHighScores = collect();

        foreach ($completedSessions as $session) {
            if (!$sessionsWithHighScores->has($session->memotestId) || $session->score > $sessionsWithHighScores[$session->memotestId]->score) {
                $sessionsWithHighScores[$session->memotestId] = $session;
            }
        }

        return $sessionsWithHighScores->values();
    }
}
