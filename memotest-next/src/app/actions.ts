'use server'

import api from "@/api";
import { revalidatePath } from 'next/cache'


export async function createSession(memotestId: number, numberOfPairs: number) {
  return await api.session.createSession(memotestId, numberOfPairs);
}

export async function updateSession(sessionId: number, attempts: number) {
  return await api.session.updateSession(sessionId, attempts);
}

export async function saveGameState(id: number, guessed: string[]) {
  return await api.session.saveGameState(id, guessed);
}

export async function endSession(sessionId: number) {
  return await api.session.endSession(sessionId);
}

export async function removeImage(id: number, image: string) {
  revalidatePath('/')
  return await api.memoTest.removeImage(id, image);
}

export async function addImage(id: number, image: string) {
  revalidatePath('/')
  return await api.memoTest.addImage(id, image);
}

export async function createMemotest(name: string, images: string[]) {
  revalidatePath('/')
  return await api.memoTest.createMemotest(name, images);
}

export async function deleteMemotest(id: number) {
  revalidatePath('/')
  return await api.memoTest.deleteMemotest(id);
}
