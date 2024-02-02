"use client"

import { useEffect, useState } from "react";
import Image from 'next/image'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export default function GameEditor({ gameInfo, handleAddImage, handleRemoveImage, handleDelete }: { gameInfo: { images: string[]; name: string; }, handleRemoveImage: Function, handleAddImage: Function, handleDelete: Function }) {

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(gameInfo.images);
  }, [])

  const handleDeleteImageButtonClicked = (image: string) => {
    handleRemoveImage(image);
    let deleted = false; // avoid deleting all items with same url
    setImages(prevImages => prevImages.filter(img => {
      if (!deleted && img === image) {
        deleted = true;
        return false;
      }
      return true;
    }));
  }

  async function handleAddImageSubmit(formData: FormData) {
    const image = formData.get("image")?.toString() ?? '';
    handleAddImage(image);
    setImages(prevImages => [...prevImages, image]);
  }

  return (
    <>
      <h1 className="text-4xl my-9">
        Editing deck: &nbsp;
        <span className="capitalize">
          {gameInfo.name}
        </span>
      </h1>

      <div className="w-full flex my-10">
        <div className="w-2/6">
          <h1 className="text-2xl ">Add image to deck</h1>
          <p className="mb-5 opacity-60 font-light">Please add 200x300 images</p>
        </div>

        <div className="w-4/6">
          <form action={handleAddImageSubmit}>
            <div className="flex items-end justify-between">
              <span className="w-4/5">
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
              <span className="w-1/5 mb-3 ml-4">
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
                onClick={() => handleDeleteImageButtonClicked(image)}
                className="absolute bg-red-500 hover:bg-red-900 opacity-75 text-white-500"
              >
                Delete
              </Button>
            </div>
          )
        })}
      </div>

      <div className="text-right">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="bg-red-500 hover:bg-red-700 text-white rounded p-3">Delete deck</div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
                <br />
                This will permanently delete <span className="capitalize">{gameInfo.name}</span> Deck.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={() => handleDelete()}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
