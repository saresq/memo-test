<?php

namespace App\GraphQL\Mutations;

use App\Models\Memotest;

class RemoveImage {

    public function __invoke($rootValue, array $args): Memotest {

        $memotest = Memotest::findOrFail($args['id']);

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
