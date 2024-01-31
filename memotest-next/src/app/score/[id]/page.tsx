import Link from "next/link"

import api from "@/api";
import { Button } from "@/components/ui/button";

export default async function ScorePage({ params: { id } }: { params: { id: number } }) {

  const { score, retries } = await api.session.getSessionById(id);

  return (
    <>
      <div className="w-full  h-96 m-auto text-center font-bold flex flex-col justify-center items-center glass">
        <h1 className="text-4xl">Congratulations, you won!</h1>
        <div className="my-5">
          <h1 className="text-4xl text-green-500">
            {score}
          </h1>
          <p>Points</p>
        </div>

        <h2>You solved the game in: {retries} attempts.</h2>
        <Link href="/" className="mt-9 ">
          <Button>
            Return to Main Menu
          </Button>
        </Link>
      </div>
    </>
  );
}
