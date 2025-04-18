import { IMatch } from "./types";

export class Match implements IMatch {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    finished: boolean;
    startTime: number;
    private matchLength: number;
    private interval: ReturnType<typeof setInterval>;

    constructor(homeTeam: string, awayTeam: string) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = 0;
        this.awayScore = 0;
        this.finished = false;
        this.startTime = Date.now();
        this.matchLength = 90_000; // 90 seconds
        this.interval = setInterval(() => this.trackTime(), 1000);
    }

    private trackTime() {
        const diff = Date.now() - this.startTime;
        if (diff >= this.matchLength) {
            this.finish();
        }
    }

    updateScore(home: number, away: number) {
        this.homeScore = home;
        this.awayScore = away;
    }

    finish() {
        if (!this.finished) {
            this.finished = true;
            clearInterval(this.interval);
        }
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
