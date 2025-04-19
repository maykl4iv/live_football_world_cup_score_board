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

test("Creates Scoreboard adds two matches, updates score and return live matches and finished matches correctly", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation();
    jest.useFakeTimers();

    const scoreboard = new Scoreboard();

    const matchOne = new Match("Spain", "Brazil");

    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchOne.homeTeam,
        awayTeam: matchOne.awayTeam,
    });
    scoreboard.startTicker();

    expect(logSpy).toHaveBeenCalledWith("Live Matches:\n");
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchOne.getSummaryString()} [0’]\n`);
    expect(logSpy).toHaveBeenCalledWith("\nFinished Matches:");

    jest.advanceTimersByTime(30_000);

    const matchTwo = new Match("Italy", "England");
    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchTwo.homeTeam,
        awayTeam: matchTwo.awayTeam,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchOne.homeTeam,
        awayTeam: matchOne.awayTeam,
        homeScore: 1,
        awayScore: 0,
    });

    expect(logSpy).toHaveBeenCalledWith("Live Matches:\n");
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchOne.getSummaryString()} [30’]\n`);
    expect(logSpy).toHaveBeenCalledWith("\nFinished Matches:");

    matchOne.updateScore(1, 0);

    jest.advanceTimersByTime(1_000);

    expect(logSpy).toHaveBeenCalledWith("Live Matches:\n");
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchOne.getSummaryString()} [31’]\n`);
    expect(logSpy).toHaveBeenCalledWith(`2. ${matchTwo.getSummaryString()} [1’]\n`);
    expect(logSpy).toHaveBeenCalledWith("\nFinished Matches:");

    jest.advanceTimersByTime(60_000);

    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchTwo.homeTeam,
        awayTeam: matchTwo.awayTeam,
        homeScore: 1,
        awayScore: 0,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchTwo.homeTeam,
        awayTeam: matchTwo.awayTeam,
        homeScore: 1,
        awayScore: 1,
    });

    expect(logSpy).toHaveBeenCalledWith("Live Matches:\n");
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchTwo.getSummaryString()} [60’]\n`);
    expect(logSpy).toHaveBeenCalledWith("\nFinished Matches:");
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchOne.getSummaryString()}\n`);

    matchTwo.updateScore(1, 0);
    matchTwo.updateScore(1, 1);

    jest.advanceTimersByTime(30_000);

    expect(logSpy).toHaveBeenCalledWith("\nFinished Matches:");
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchTwo.getSummaryString()}\n`);
    expect(logSpy).toHaveBeenCalledWith(`1. ${matchOne.getSummaryString()}\n`);
});
