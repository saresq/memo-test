<?php

namespace App\GraphQL\Mutations;

use App\Models\Session;

class UpdateSession {

    public function __invoke($rootValue, array $args): Session {

        $session = Session::findOrFail($args['id']);

        $session->retries = $args['retries'];
        $session->save();

        return $session;
    }
}
