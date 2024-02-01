<?php

namespace App\GraphQL\Mutations;

use App\Models\Memotest;
use App\Models\Session;

class RemoveImage {

    public function __invoke($rootValue, array $args): Memotest {

        $memotest = Memotest::findOrFail($args['id']);

        // Cancel sessions with the memotestId and status STARTED
        Session::where('memotestId', $args['id'])
                ->where('state', Session::STATUS_STARTED)
                ->update(['state' => Session::STATUS_CANCELED]);

        $images = $memotest->images;
        $index = array_search($args['image'], $images);
        if ($index !== false) {
            unset($images[$index]);
            $memotest->images = array_values($images);
            $memotest->save();
        }

        return $memotest;
    }
}
