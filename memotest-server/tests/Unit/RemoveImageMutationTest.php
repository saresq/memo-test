<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Memotest;
use Database\Factories\MemotestFactory;

class RemoveImageMutationTest extends TestCase {
    public function testRemoveImageMutation(): void {
        $memotest = MemotestFactory::new()->create();
        $image = 'https://example.com/image.jpg';
        $escapedUrl = str_replace('/', '\/', $image);
        $memotest->images = [$image];
        $memotest->save();

        $response = $this->graphQL("
            mutation {
                removeImage(id: $memotest->id, image: \"$image\") {
                    id
                    name
                    images
                    created_at
                    updated_at
                }
            }
        ");

        $response->assertJsonStructure([
            'data' => [
                'removeImage' => [
                    'id',
                    'name',
                    'images',
                    'created_at',
                    'updated_at',
                ]
            ]
        ])->assertJsonMissing([
            'images' => [
                $escapedUrl
            ]
        ]);
    }
}
