import { Match } from "../Match";

test("Creates a match with 0-0 score", () => {
    const match = new Match("Spain", "Brazil");
    expect(match.getSummaryString()).toBe("Spain: 0 - 0 :Brazil");
});

test("Updates a match score to 1-0", () => {
    const match = new Match("Spain", "Brazil");
    expect(match.getSummaryString()).toBe("Spain: 0 - 0 :Brazil");
    match.updateScore(1, 0);
    expect(match.getSummaryString()).toBe("Spain: 1 - 0 :Brazil");
});
