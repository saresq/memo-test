"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from 'next/image'

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export default function GameCreator({ handleCreate }: { handleCreate: Function }) {

  const [images, setImages] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>("");

  const handleDeleteButtonClicked = (image: string) => {
    let deleted = false; // avoid deleting all items with same url
    setImages(prevImages => prevImages.filter(img => {
      if (!deleted && img === image) {
        deleted = true;
        return false;
      }
      return true;
    }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleAddImageSubmit = (formData: FormData) => {
    const image = formData.get("image")?.toString() ?? '';
    setImages(prevImages => [...prevImages, image]);
  }

  async function handleCreateButtonClicked() {
    handleCreate(inputName, images);
  }

  return (
    <>
      <h1 className="text-4xl my-9">Create New Deck</h1>
      <div className="w-full flex my-10">
        <div className="w-2/6">
          <h1 className="text-2xl">Deck Name:</h1>
        </div>
        <div className="w-4/6">
          <div className="flex items-end justify-between w-4/5 pr-4">
            <Input
              type="text"
              id="name"
              value={inputName}
              placeholder="Write Name"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex my-10">
        <div className="w-2/6">
          <h1 className="text-2xl">Add image to deck</h1>
          <p className="mb-5 opacity-60 font-light">Please add 200x300 images</p>
        </div>
        <div className="w-4/6">
          <form action={handleAddImageSubmit}>
            <div className="flex items-end justify-between">
              <span className="w-4/5 mr-4">
                <Label htmlFor="image">Paste Image Url</Label>
                <Input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="Ex: https://picsum.photos/200/300"
                  className="mb-3"
                  required
                />
              </span>
              <span className="w-1/5 mb-3">
                <Button
                  className="bg-emerald-700 hover:bg-emerald-900 text-white"
                  type="submit"
                >
                  Add
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>

      {images.length === 0 &&
        (<h1 className="text-orange-500 text-center"> No Images loaded</h1>)
      }
      <div className="grid grid-cols-4 gap-4 my-10">
        {images.map((image, index) => {
          return (
            <div 
              key={image + index}
              className="static flex flex-col gap-4 w-48 align-center justify-center items-center"
            >
              <Image
                src={image}
                alt="Memotest Card"
                width={200}
                height={300}
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="w-48"
              />
              <Button 
                onClick={() => handleDeleteButtonClicked(image)}
                className="absolute bg-red-500 hover:bg-red-900 opacity-75 text-white-500"
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Button
          onClick={() => handleCreateButtonClicked()}
          className="text-2xl my-6 bg-emerald-500 hover:bg-emerald-700 disabled:bg-emerald-900 text-white"
          disabled={images.length === 0 || inputName === ""}
        >
          Create Deck
        </Button>
      </div>
    </>
  );
}
