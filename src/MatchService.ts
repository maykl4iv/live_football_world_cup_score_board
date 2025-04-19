import { Match } from "./Match";
import { IMatch } from "./types";

export class MatchService {
    private matches: IMatch[];

    constructor() {
        this.matches = [];
    }

    createMatch(homeTeam: string, awayTeam: string): IMatch {
        const existingMatch = this.findMatch(homeTeam, awayTeam);
        if (existingMatch) {
            return existingMatch;
        }

        const newMatch = new Match(homeTeam, awayTeam);
        this.matches.push(newMatch);
        return newMatch;
    }

    findMatch(homeTeam: string, awayTeam: string): IMatch | undefined {
        return this.matches.find(
            (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
        );
    }
}
