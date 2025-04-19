import { IMatch, IEvent, EventsTypes } from "./types";
import { Match } from "./Match";

export class Scoreboard {
    matches: IMatch[];
    #intervalId?: ReturnType<typeof setInterval>;

    constructor() {
        this.matches = [];
    }

    feed(event: IEvent<EventsTypes>) {
        const match = this.findMatch(event.homeTeam, event.awayTeam);

        switch (event.type) {
            case EventsTypes.start:
                if (!match) {
                    this.matches.push(new Match(event.homeTeam, event.awayTeam));
                }
                break;
            case EventsTypes.score:
                if (match && match.isLive()) {
                    match.updateScore(event.homeScore, event.awayScore);
                }
                break;
        }
    }

    startTicker() {
        this.render();
        this.#intervalId = setInterval(() => {
            const liveMatches = this.getLiveMatches();

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
        return this.matches.find((m) => m.homeTeam === home && m.awayTeam === away);
    }

    getLiveMatches() {
        return this.matches.filter((m) => m.isLive());
    }

    getFinishedMatches() {
        return this.matches.filter((m) => !m.isLive());
    }

    render(final = false) {
        console.clear();

        const live = this.getLiveMatches();
        const finished = this.getFinishedMatches();

        if (!final) {
            console.log("Live Matches:\n");
            this.printMatches(live);
        }

        console.log("\nFinished Matches:");
        this.printMatches(finished);
    }

    private printMatches(matches: IMatch[]) {
        const sorted = [...matches].sort((a, b) => {
            const diff = b.getTotalAmountOfGoals() - a.getTotalAmountOfGoals();
            return diff !== 0 ? diff : b.getStartTime() - a.getStartTime();
        });

        sorted.forEach((match, idx) => {
            const uptime = Math.ceil((Date.now() - match.getStartTime()) / 1000);

            const timeStr = match.isLive?.() ? ` [${uptime}’]` : "";
            console.log(`${idx + 1}. ${match.getSummaryString()}${timeStr}\n`);
        });
    }
}
