import { API_GRAPHQL_URL } from "./lib/constants";
import type { Memotest, Session } from "./types";

const makeGraphQLRequest = async (query: string, variables: Record<string, any>): Promise<any> => {
  const url: string = API_GRAPHQL_URL!;
  const headers = {
    'content-type': 'application/json',
  };

  const requestBody = { query, variables };
  const options: RequestInit & { cache: string } = { method: 'POST', headers, body: JSON.stringify(requestBody), cache: 'no-store'};

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (responseData.errors) {
    throw new Error(responseData.errors[0].message);
  }

  return responseData.data;
};

const api = {
  memoTest: {
    list: async (): Promise<Memotest[]> => {
      const query = `query GetMemotestList{
                        memotests {
                          id
                          name
                          images
                        }
                      }`;

      const data = await makeGraphQLRequest(query, {});
      return data.memotests;
    },
    getById: async (id: number): Promise<{ images: string[], name: string }> => {
      const query = `query GetMemotestImages ($id: ID!) {
                        memotest(id: $id) {
                          name
                          images
                        }
                      }`;

      const variables = { id };
      const data = await makeGraphQLRequest(query, variables);
      return data.memotest;
    },
    createMemotest: async (name: string, images: string[]): Promise<Memotest> => {
      const query = `mutation CreateMemotest($name: String!, $images: [String]!) {
                      createMemotest(name: $name, images: $images) {
                        id
                        name
                        images
                      }
                    }`;
      const variables = { name, images };
      const data = await makeGraphQLRequest(query, variables);
      return data.createMemotest;
    },
    deleteMemotest: async (id: number): Promise<{ id: number}> => {
      const query = `mutation DeleteMemotest($id: ID!) {
                      deleteMemotest(id: $id) {
                        id
                      }
                    }`;

      const variables = { id };
      const data = await makeGraphQLRequest(query, variables);
      return data.deleteMemotest;
    },
    removeImage: async (id: number, image: string): Promise<Session> => {
      const query = `mutation RemoveImage($id: ID!, $image: String!) {
                        removeImage(id: $id, image: $image) {
                          images
                          name
                        }
                      }`;

      const variables = { id, image };
      const data = await makeGraphQLRequest(query, variables);
      return data.removeImage;
    },
    addImage: async (id: number, image: string): Promise<Session> => {
      const query = `mutation AddImage($id: ID!, $image: String!) {
                        addImage(id: $id, image: $image) {
                          images
                          name
                        }
                      }`;

      const variables = { id, image };
      const data = await makeGraphQLRequest(query, variables);
      return data.addImage;
    },
  },
  session: {
    getById: async (id: number): Promise<Session> => {
      const query = `query GetSession ($id: ID!) {
                        session(id: $id) {
                          id
                          memotestId
                          numberOfPairs
                          retries
                          score
                          state
                          gameState
                        }
                      }`;

      const variables = { id };
      const data = await makeGraphQLRequest(query, variables);
      return data.session;
    },
    createSession: async (memotestId: number, numberOfPairs: number): Promise<Session> => {
      const query = `mutation CreateSession($memotestId: Int!, $numberOfPairs: Int!) {
                        createSession(memotestId: $memotestId, numberOfPairs: $numberOfPairs) {
                          id
                          retries
                          score
                          state
                          memotestId
                          numberOfPairs
                        }
                      }`;

      const variables = { memotestId, numberOfPairs };
      const data = await makeGraphQLRequest(query, variables);
      return data.createSession;
    },
    updateSession: async (id: number, retries: number): Promise<Session> => {
      const query = `mutation UpdateSession($id: ID!, $retries: Int!) {
                        updateSession(id: $id, retries: $retries) {
                          retries
                        }
                      }`;

      const variables = { id, retries };
      const data = await makeGraphQLRequest(query, variables);
      return data.updateSession;
    },
    saveGameState: async (id: number, gameState: string[]): Promise<Session> => {
      const query = `mutation SaveGameState($id: ID!, $gameState: [String]!) {
                        saveGameState(id: $id, gameState: $gameState) {
                          id
                          gameState
                        }
                      }`;

      const variables = { id, gameState };
      const data = await makeGraphQLRequest(query, variables);
      return data.updateSession;
    },
    endSession: async (id: number): Promise<Session> => {
      const query = `mutation EndSession($id: ID!) {
                        endSession(id: $id) {
                          id
                          score
                          retries
                          state
                        }
                      }`;

      const variables = { id };
      const data = await makeGraphQLRequest(query, variables);
      return data.updateSession;
    },
    getHighScores: async (): Promise<Session[]> => {
      const query = `query GetHighScores {
                        getHighScores {
                          id
                          memotestId
                          score
                        }
                      }
                    `;

      const variables = {};
      const data = await makeGraphQLRequest(query, variables);
      return data.getHighScores;
    },
    getStartedSessions: async (): Promise<Session[]> => {
      const query = `query GetStartedSessions {
                        getStartedSessions {
                          id
                          memotestId
                          retries
                        }
                      }
                    `;

      const variables = {};
      const data = await makeGraphQLRequest(query, variables);
      return data.getStartedSessions;
    },
  },
};

export default api;
