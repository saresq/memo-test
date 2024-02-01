import Link from "next/link"

import { createMemotest } from "@/app/actions";
import GameCreator from "@/components/memotest/GameCreator";
import { redirect } from "next/navigation";
import MainMenuButton from "@/components/main-menu-button/MainMenuButton";

export default async function EditPage() {


  async function handleCreate(name: string, images: string[]) {
    "use server"
    await createMemotest(name, images);
    redirect('/');
  }

  return (
    <>
      <div className="w-full m-auto p-9 glass font-mono">
        <MainMenuButton />
        <GameCreator
          handleCreate={handleCreate}
        />
      </div>
    </>
  );
}
