import { Scoreboard } from "../Scoreboard";

test("Creates Scoreboard and finds a match", () => {
    const match = { home: "Spain", away: "Brazil" };

    const scoreboard = new Scoreboard();
    const currMatch = scoreboard.findMatch(match.home, match.away);

    expect(currMatch.homeTeam).toBe(match.home);
    expect(currMatch.awayTeam).toBe(match.away);
});
