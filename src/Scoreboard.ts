import { IMatch, IEvent, EventsTypes } from "./types";
import { Match } from "./Match";

export class Scoreboard {
    matches: IMatch[];

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
        }
    }

    findMatch(home: string, away: string): IMatch | undefined {
        return this.matches.find((m) => m.homeTeam === home && m.awayTeam === away);
    }
}
