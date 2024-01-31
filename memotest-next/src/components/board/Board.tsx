"use client"

import Image from 'next/image'
import { useEffect, useState } from "react";

import { Session } from "@/types";
import { updateSession } from "@/app/actions";
import { cn } from "@/lib/utils";

// Placeholder for when loading external url images
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export default function Board({ session, deck, handleEndGame, saveGameState }: { session: Session, deck: { index: number; value: string }[], handleEndGame: Function, saveGameState: Function }) {
  const [attempts, setAttempts] = useState<number>(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<string[]>([]);

  const sessionId = session.id;
  const numberOfPairs = session.numberOfPairs;

  async function addAttempt() {
    await updateSession(sessionId, attempts + 1);
    setAttempts(prevAttempts => prevAttempts + 1);
  }

  // Initialize session
  useEffect(() => {
    setSolved(session.gameState);
    setAttempts(session.retries);
  }, [])

  useEffect(() => {
    saveGameState(sessionId, solved);
  }, [solved])

  useEffect(() => {
    if (solved.length === numberOfPairs) {
      handleEndGame();
    }

    const checkForMatch = () => {
      const [firstIndex, secondIndex] = flipped;
      const [firstCard, secondCard] = [deck[firstIndex].value, deck[secondIndex].value];

      if (firstCard === secondCard) {
        setSolved(prevSolved => [...prevSolved, firstCard]);
      }

      setFlipped([]);
    };

    if (flipped.length === 2) {
      addAttempt();

      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [deck, flipped]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped(prevFlipped => [...prevFlipped, index]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-5 my-10">
        {deck.map(({ index, value }) => (
          <div
            key={index}
            className={cn("cursor-pointer transform flex justify-center align-center transition-transform select-none",
              { "flip": flipped.includes(index) || solved.includes(value) })}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(value)
              ? (
                <Image
                  src={value}
                  alt="Memotest Card"
                  width={200}
                  height={300}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              )
              : (
                <div className="backCard flex items-center justify-center text-5xl font-extrabold">
                  <p>{index + 1}</p>
                </div>
              )}
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-extrabold text-center my-10">Attempts: {attempts}</h1>
    </>
  )

}
