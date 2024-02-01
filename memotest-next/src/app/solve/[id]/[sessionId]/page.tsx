import { redirect } from "next/navigation";

import api from "@/api";
import { Session } from "@/types";
import { endSession, saveGameState } from "@/app/actions";
import Board from "@/components/board/Board";
import MainMenuButton from "@/components/main-menu-button/MainMenuButton";


export default async function SolvePage({ params: { id, sessionId} }: { params: { id: number, sessionId: number } }) {

  const { images, name } = await api.memoTest.getById(id);
  const session: Session = await api.session.getById(sessionId)

  const generateDeck = () => {
    const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);
    return shuffledImages.map((image, index) => ({ index, value: image }));
  };

  async function endGame() {
    "use server"
    await endSession(session.id);
    redirect(`/score/${session.id}`);
  }

  return (
    <div className="glass p-9">
      <MainMenuButton />
      <h1 className="pb-6 text-5xl tracking-tight tracking-tightscroll-m-20 text-center font-bold font-mono capitalize">
        Deck: {name}
      </h1>
      <Board
        session={session}
        deck={generateDeck()}
        handleEndGame={endGame}
        saveGameState={saveGameState}
      />
    </div>
  );
}
