export interface IMatch {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    finished: boolean;
    isLive(): boolean;
    updateScore(home: number, away: number): void;
    getTotalAmountOfGoals(): number;
    getStartTime(): number;
    getSummaryString(): string;
    finish(): void;
}

export interface IMatchService {
    createMatch(homeTeam: string, awayTeam: string): IMatch;
    findMatch(homeTeam: string, awayTeam: string): IMatch | undefined;
    getLiveMatches(): IMatch[];
    getFinishedMatches(): IMatch[];
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
