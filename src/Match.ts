export class Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    finished: boolean;

    constructor(homeTeam: string, awayTeam: string) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = 0;
        this.awayScore = 0;
        this.finished = false;
    }

    updateScore(home: number, away: number) {
        this.homeScore = home;
        this.awayScore = away;
    }

    finish() {
        this.finished = true;
    }

    isLive() {
        return !this.finished;
    }

    getSummaryString() {
        return `${this.homeTeam}: ${this.homeScore} - ${this.awayScore} :${this.awayTeam}`;
    }

    getTotalAmountOfGoals() {
        return this.homeScore + this.awayScore;
    }
}
