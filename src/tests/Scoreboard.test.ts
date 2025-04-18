import { Scoreboard } from "../Scoreboard";
import { EventsTypes } from "../types";

jest.useFakeTimers();

test("Creates Scoreboard and finds a match", () => {
    const match = { home: "Spain", away: "Brazil" };

    const scoreboard = new Scoreboard();

    scoreboard.feed({ type: EventsTypes.start, homeTeam: match.home, awayTeam: match.away });
    const currMatch = scoreboard.findMatch(match.home, match.away);

    expect(currMatch?.homeTeam).toBe(match.home);
    expect(currMatch?.awayTeam).toBe(match.away);
    jest.advanceTimersByTime(90_000);
});
