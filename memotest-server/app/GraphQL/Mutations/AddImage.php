<?php

namespace App\GraphQL\Mutations;

use App\Models\Memotest;
use App\Models\Session;

class AddImage {

    public function __invoke($rootValue, array $args): Memotest {

        $memotest = Memotest::findOrFail($args['id']);

        // Cancel sessions with the memotestId and status STARTED
        Session::where('memotestId', $args['id'])
               ->where('state', Session::STATUS_STARTED)
               ->update(['state' => Session::STATUS_CANCELED]);

        $images = $memotest->images;
        $images[] = $args['image'];
        $memotest->images = $images;
        $memotest->save();


        return $memotest;
    }
}
