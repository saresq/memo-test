import { SESSION_STATE_CANCELED, SESSION_STATE_COMPLETED, SESSION_STATE_STARTED } from "./lib/constants";

export interface Memotest {
  id: number;
  name: string;
  images: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Session {
  id: number;
  memotestId: number;
  retries: number;
  numberOfPairs: number;
  state: SessionState;
  score: number;
  gameState: string[];
  created_at: Date;
  updated_at: Date;
}

enum SessionState {
  STARTED = SESSION_STATE_STARTED,
  COMPLETED = SESSION_STATE_COMPLETED,
  CANCELED = SESSION_STATE_CANCELED,
}
