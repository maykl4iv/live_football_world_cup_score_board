import { IMatch } from "./types";

export class Scoreboard {
    matches: IMatch[];

    constructor() {
        this.matches = [];
    }

    findMatch(home: string, away: string): IMatch {
        return {} as IMatch;
    }
}
