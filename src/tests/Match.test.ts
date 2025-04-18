import { Match } from "../Match";

test("Creates a match with 0-0 score", () => {
    const match = new Match("Spain", "Brazil");
    expect(match.getSummaryString()).toBe("Spain: 0 - 0 :Brazil");
});
