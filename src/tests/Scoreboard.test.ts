import { Scoreboard } from "../Scoreboard";
import { Match } from "../Match";
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

test("Creates Scoreboard adds two matches and return live matches and finished matches correctly", () => {
    const matchOne = new Match("Spain", "Brazil");

    const scoreboard = new Scoreboard();

    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchOne.homeTeam,
        awayTeam: matchOne.awayTeam,
    });

    expect(scoreboard.getLiveMatches()).toEqual([matchOne]);

    jest.advanceTimersByTime(30_000);

    const matchTwo = new Match("Italy", "England");
    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchTwo.homeTeam,
        awayTeam: matchTwo.awayTeam,
    });

    expect(scoreboard.getLiveMatches()).toEqual([matchOne, matchTwo]);

    jest.advanceTimersByTime(60_000);

    expect(scoreboard.getLiveMatches()).toEqual([matchTwo]);
    expect(scoreboard.getFinishedMatches()).toEqual([matchOne]);

    jest.advanceTimersByTime(30_000);

    expect(scoreboard.getLiveMatches()).toEqual([]);
    expect(scoreboard.getFinishedMatches()).toEqual([matchOne, matchTwo]);
});
