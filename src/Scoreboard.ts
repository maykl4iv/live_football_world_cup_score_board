import { IMatch, IEvent, EventsTypes } from "./types";
import { MatchService } from "./MatchService";

export class Scoreboard {
    matchService: MatchService;
    #intervalId?: ReturnType<typeof setInterval>;

    constructor() {
        this.matchService = new MatchService();
    }

    feed(event: IEvent<EventsTypes>) {
        switch (event.type) {
            case EventsTypes.start:
                this.matchService.createMatch(event.homeTeam, event.awayTeam);
                break;
            case EventsTypes.score:
                this.matchService.updateScore(
                    event.homeTeam,
                    event.awayTeam,
                    event.homeScore,
                    event.awayScore
                );
                break;
        }
    }

    startTicker() {
        this.render();
        this.#intervalId = setInterval(() => {
            const liveMatches = this.matchService.getLiveMatches();

            if (liveMatches.length === 0) {
                this.stopTicker();
                this.render(true);
                return;
            }

            this.render();
        }, 1000);
    }

    stopTicker() {
        if (this.#intervalId) clearInterval(this.#intervalId);
    }

    findMatch(home: string, away: string): IMatch | undefined {
        return this.matchService.findMatch(home, away);
    }

    render(final = false) {
        console.clear();

        const live = this.matchService.getLiveMatches();
        const finished = this.matchService.getFinishedMatches();

        if (!final) {
            console.log("Live Matches:\n");
            this.matchService.printMatches(live);
        }

        console.log("\nFinished Matches:");
        this.matchService.printMatches(finished);
    }
}
