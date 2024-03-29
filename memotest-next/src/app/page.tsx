import { redirect } from "next/navigation";
import Link from "next/link";

import api from "@/api";
import { Memotest } from "@/types";
import { createSession } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function HomePage() {

  const memotests = await api.memoTest.list();
  const startedSessions = await api.session.getStartedSessions();
  const highScores = await api.session.getHighScores();

  const scoreMap: Record<number, string> = highScores.reduce(
    (acc, session) => ({ ...acc, [session.memotestId]: session.score }), {}
  );
  const idMap: Record<number, number> = startedSessions.reduce(
    (acc, session) => ({ ...acc, [session.memotestId]: session.id }), {}
  );

  async function handleNewGame(formData: FormData) {
    "use server"

    const memotestId = Number(formData.get("id"));
    const numberOfPairs = Number(formData.get("numberOfPairs"));
    await createSession(memotestId, numberOfPairs)
      .then((session) => redirect(`/solve/${memotestId}/${session.id}`));
  }

  async function handleContinueGame(formData: FormData) {
    "use server"

    const sessionId = Number(formData.get("id"));
    const memotestId = Number(formData.get("memotestId"));
    redirect(`/solve/${memotestId}/${sessionId}`);
  }

  return (
    <div className="glass p-9">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4/6 text-xl pl-10">Deck Name</TableHead>
            <TableHead className="w-1/6 text-xl text-center">Highscore</TableHead>
            <TableHead className="w-1/6 text-xl text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memotests.map((memotest: Memotest) => (
            <TableRow key={memotest.id}>
              <TableCell className="flex capitalize">
                <Link href={`/edit/${memotest.id}`}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="font-extrabold mr-4 cursor-pointer"> &#x2699;</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Deck Images</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </Link>
                {memotest.name}
              </TableCell>
              <TableCell 
                className="font-medium text-center"
              >
                {scoreMap[memotest.id] ? scoreMap[memotest.id] : '-'}
              </TableCell>
              <TableCell className="text-center flex justify-right">
                {/* Wordkaround for avoiding creating a client-component just to trigger 2 actions */}
                <form action={handleNewGame}>
                  <input name="id" className="hidden" value={memotest.id} readOnly />
                  <input name="numberOfPairs" className="hidden" value={memotest.images.length} readOnly />
                  <Button 
                    className="mr-4 bg-pink-700 text-white hover:bg-pink-900"
                    type="submit"
                  >
                    New Game
                  </Button>
                </form>
                {idMap[memotest.id] && (
                  <form action={handleContinueGame}>
                    <input name="id" className="hidden" value={idMap[memotest.id]} readOnly />
                    <input name="memotestId" className="hidden" value={memotest.id} readOnly />
                    <Button
                      className="bg-orange-700 hover:bg-orange-900 text-white"
                      type="submit"
                    >
                      Continue
                    </Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="my-10 w-full text-center">
        <Link href={`/create`}>
          <Button className="bg-pink-700 text-white hover:bg-pink-900">Create New Deck</Button>
        </Link>
      </div>
    </div>
  );
}
