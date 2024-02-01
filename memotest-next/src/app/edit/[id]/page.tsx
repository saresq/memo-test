import Link from "next/link"
import { redirect } from "next/navigation";

import api from "@/api";
import { addImage, deleteMemotest, removeImage } from "@/app/actions";
import GameInfo from "@/components/memotest/GameEditor";
import MainMenuButton from "@/components/main-menu-button/MainMenuButton";

export default async function EditPage({ params: { id } }: { params: { id: number } }) {

  const gameInfo = await api.memoTest.getById(id);

  async function handleRemoveImage(image: string) {
    "use server"
    await removeImage(id, image);
  }

  async function handleAddImage(image: string) {
    "use server"
    await addImage(id, image);
  }

  async function handleDelete(image: string) {
    "use server"
    await deleteMemotest(id);
    redirect('/');
  }

  return (
    <>
      <div className="w-full m-auto p-9 glass font-mono">
        <MainMenuButton />
        <GameInfo
          gameInfo={gameInfo}
          handleRemoveImage={handleRemoveImage}
          handleAddImage={handleAddImage}
          handleDelete={handleDelete}
        />
        <p className="text-center opacity-60">-- All changes are automatically saved --</p>
      </div>
    </>
  );
}
