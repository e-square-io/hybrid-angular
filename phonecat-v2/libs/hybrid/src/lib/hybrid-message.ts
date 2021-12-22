// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HybridMessagePayload = Record<string, any>;

export enum HybridMessageSubject {
  Loaded = 1,
  Navigation,
  Search,
}

export interface HybridMessage {
  subject: HybridMessageSubject;
  sessionId: string;
  payload: HybridMessagePayload;
}
