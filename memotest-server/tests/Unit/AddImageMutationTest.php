<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Memotest;
use Database\Factories\MemotestFactory;

class AddImageMutationTest extends TestCase {
    public function testAddImageMutation(): void {
        $memotest = MemotestFactory::new()->create();
        $image = "https://example.com/image.jpg";
        $escapedUrl = str_replace('/', '\/', $image);

        $response = $this->graphQL("
            mutation {
                addImage(id: $memotest->id, image: \"$image\") {
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
                'addImage' => [
                    'id',
                    'name',
                    'images',
                    'created_at',
                    'updated_at',
                ]
            ]
        ])->assertSee($escapedUrl);

    }

}
