<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Session;
use Illuminate\Database\Eloquent\Collection;

final class GetStartedSessions {
    /**
     * Get the high score for a specific memotestId.
     *
     * @param  null  $_
     * @param  array  $args
     * @return Session[]
     */
    public function __invoke($rootValue, array $args): Collection {

        $sessions = Session::where('state', Session::STATUS_STARTED)->get();

        return $sessions;
    }
}
