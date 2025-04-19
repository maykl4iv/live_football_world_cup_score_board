import { Match } from "./Match";
import { IMatch, IMatchService } from "./types";

export class MatchService implements IMatchService {
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

    updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number) {
        const match = this.findMatch(homeTeam, awayTeam);
        if (match && match.isLive()) {
            match.updateScore(homeScore, awayScore);
        }
    }

    getLiveMatches() {
        return this.matches.filter((m) => m.isLive());
    }

    getFinishedMatches() {
        return this.matches.filter((m) => !m.isLive());
    }

    sortMatches(matches: IMatch[]): IMatch[] {
        return matches.sort((a, b) => {
            const diff = b.getTotalAmountOfGoals() - a.getTotalAmountOfGoals();
            return diff !== 0 ? diff : b.getStartTime() - a.getStartTime();
        });
    }

    printMatches(matches: IMatch[]): void {
        const sorted = this.sortMatches(matches);

        sorted.forEach((match, idx) => {
            const uptime = Math.ceil((Date.now() - match.getStartTime()) / 1000);
            const timeStr = match.isLive() ? ` [${uptime}’]` : "";
            console.log(`${idx + 1}. ${match.getSummaryString()}${timeStr}\n`);
        });
    }
}
