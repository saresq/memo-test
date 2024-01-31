import Link from "next/link"

import api from "@/api";

import { addImage, removeImage } from "@/app/actions";
import GameInfo from "@/components/game-info/GameInfo";

export default async function EditPage({ params: { id } }: { params: { id: number } }) {

  const gameInfo = await api.memoTest.getById(id);

  async function handleDelete(image: string) {
    "use server"
    await removeImage(id, image);
  }

  async function handleAdd(image: string) {
    "use server"
    await addImage(id, image);
  }


  return (
    <>
      <div className="w-full m-auto p-9 glass font-mono">
        <Link href="/" className="hover:underline">
          &#x3c; Return to Main Menu
        </Link>


          <GameInfo
            gameInfo={gameInfo}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
          />

      </div>
    </>
  );
}
