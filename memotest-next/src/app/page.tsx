import { redirect } from "next/navigation";

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


export default async function HomePage() {

  const memotests = await api.memoTest.list();
  const startedSessions = await api.session.getStartedSessions();
  const highScores = await api.session.getHighScores();

  const scoreMap: Record<number, string> = highScores.reduce((acc, session) => ({ ...acc, [session.memotestId]: session.score }), {});
  const idMap: Record<number, number> = startedSessions.reduce((acc, session) => ({ ...acc, [session.memotestId]: session.id }), {});

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
            <TableHead className="w-4/6">Deck Name</TableHead>
            <TableHead className="w-1/6 text-center">Highscore</TableHead>
            <TableHead className="w-1/6 text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memotests.map((memotest: Memotest) => (
            <TableRow key={memotest.id}>
              <TableCell className="font-medium">{memotest.name}</TableCell>
              <TableCell className="font-medium text-center">{scoreMap[memotest.id] ? scoreMap[memotest.id] : '-'}</TableCell>
              <TableCell className="text-center flex justify-right">
                {/* Wordkaround for avoiding creating a client-component just to trigger 2 actions */}
                <form action={handleNewGame}>
                  <input name="id" className="hidden" value={memotest.id} readOnly />
                  <input name="numberOfPairs" className="hidden" value={memotest.images.length} readOnly />
                  <Button className="mr-4" type="submit">New Game</Button>
                </form>
                {idMap[memotest.id] && (
                  <form action={handleContinueGame}>
                    <input name="id" className="hidden" value={idMap[memotest.id]} readOnly />
                    <input name="memotestId" className="hidden" value={memotest.id} readOnly />
                    <Button type="submit">Continue</Button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
