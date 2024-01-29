<?php

namespace App\GraphQL\Mutations;

use App\Models\Memotest;

class AddImage {

    public function __invoke($rootValue, array $args): Memotest {

        $memotest = Memotest::findOrFail($args['id']);

        $images = $memotest->images;
        $images[] = $args['image'];
        $memotest->images = $images;
        $memotest->save();

        return $memotest;
    }
}
