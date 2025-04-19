import { Match } from "../Match";
import { MatchService } from "../MatchService";

jest.useFakeTimers();

test("Creates match if doesnt exist", () => {
    const matchService = new MatchService();

    const match = matchService.createMatch("Spain", "Brazil");
    expect(match).toBeInstanceOf(Match);
    expect(match.homeTeam).toBe("Spain");
    expect(match.awayTeam).toBe("Brazil");
    match.finish();
});

test("Should not create a duplicate match", () => {
    const matchService = new MatchService();

    const duplicateMatch = matchService.createMatch("Spain", "Brazil");
    expect(duplicateMatch).toBe(matchService.createMatch("Spain", "Brazil"));
    duplicateMatch.finish();
});

test("should update score of a match", () => {
    const matchService = new MatchService();

    const match = matchService.createMatch("Spain", "Brazil");
    matchService.updateScore("Spain", "Brazil", 1, 2);
    expect(match.homeScore).toBe(1);
    expect(match.awayScore).toBe(2);
    match.finish();
});

test("Creates MatchService adds two matches and return live matches and finished matches correctly", () => {
    const matchOne = new Match("Spain", "Brazil");

    const matchService = new MatchService();

    matchService.createMatch(matchOne.homeTeam, matchOne.awayTeam);

    expect(matchService.getLiveMatches()).toEqual([matchOne]);

    jest.advanceTimersByTime(30_000);

    const matchTwo = new Match("Italy", "England");
    matchService.createMatch(matchTwo.homeTeam, matchTwo.awayTeam);

    expect(matchService.getLiveMatches()).toEqual([matchOne, matchTwo]);

    jest.advanceTimersByTime(60_000);

    expect(matchService.getLiveMatches()).toEqual([matchTwo]);
    expect(matchService.getFinishedMatches()).toEqual([matchOne]);

    jest.advanceTimersByTime(30_000);

    expect(matchService.getLiveMatches()).toEqual([]);
    expect(matchService.getFinishedMatches()).toEqual([matchOne, matchTwo]);
});
