import { Match } from "../Match";
import { MatchService } from "../MatchService";

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
