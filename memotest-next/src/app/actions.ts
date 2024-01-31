'use server'

import api from "@/api";

export async function createSession(memotestId: number, numberOfPairs: number) {
  return await api.session.createSession(memotestId, numberOfPairs);
}

export async function updateSession(sessionId: number, attempts: number) {
  return await api.session.updateSession(sessionId, attempts);
}

export async function saveGameState(id:number, guessed: string[]) {
  return await api.session.saveGameState(id, guessed);
}

export async function endSession(sessionId: number) {
  return await api.session.endSession(sessionId);
}

