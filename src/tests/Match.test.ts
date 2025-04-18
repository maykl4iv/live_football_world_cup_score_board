import { Match } from "../Match";

test("Creates a match with 0-0 score", () => {
    const match = new Match("Spain", "Brazil");
    expect(match.getSummaryString()).toBe("Spain: 0 - 0 :Brazil");
});

test("Updates a match score to 1-0", () => {
    const match = new Match("Spain", "Brazil");
    match.updateScore(1, 0);

    expect(match.getSummaryString()).toBe("Spain: 1 - 0 :Brazil");
});

test("Creates match, updates score to 3-2 and shows totalAmountOfGoals", () => {
    const match = new Match("Spain", "Brazil");

    match.updateScore(1, 0);
    match.updateScore(1, 1);
    match.updateScore(1, 2);
    match.updateScore(2, 2);
    match.updateScore(3, 2);

    expect(match.getSummaryString()).toBe("Spain: 3 - 2 :Brazil");
    expect(match.getTotalAmountOfGoals()).toBe(5);
});
