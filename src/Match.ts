export class Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;

    constructor(homeTeam: string, awayTeam: string) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = 0;
        this.awayScore = 0;
    }

    updateScore(home: number, away: number) {
        this.homeScore = home;
        this.awayScore = away;
    }

    getSummaryString() {
        return `${this.homeTeam}: ${this.homeScore} - ${this.awayScore} :${this.awayTeam}`;
    }

    getTotalAmountOfGoals() {}
}
