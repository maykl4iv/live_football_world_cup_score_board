export interface IMatch {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    finished: boolean;
    startTime: number;
}

export enum EventsTypes {
    start = "start",
    score = "score",
}

type IEventBase = {
    homeTeam: string;
    awayTeam: string;
};

export type IEvent<T extends EventsTypes> = T extends EventsTypes.start
    ? IEventBase & { type: T }
    : IEventBase & {
          homeScore: number;
          awayScore: number;
          type: T;
      };
