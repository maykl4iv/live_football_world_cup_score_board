import { Match } from "../Match";

jest.useFakeTimers();

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

test("Creates match, updates score to 1-1 and finishes Match", () => {
    const match = new Match("Spain", "Brazil");

    match.updateScore(1, 0);
    match.updateScore(1, 1);

    expect(match.isLive()).toBe(true);
    match.finish();
    expect(match.isLive()).toBe(false);

    expect(match.getSummaryString()).toBe("Spain: 1 - 1 :Brazil");
    expect(match.getTotalAmountOfGoals()).toBe(2);
});

test("Creates match, updates score to 2-1 and finishes Match after 90 seconds passed", () => {
    const match = new Match("Spain", "Brazil");

    match.updateScore(1, 0);
    match.updateScore(1, 1);
    setTimeout(() => match.updateScore(2, 1), 59_000);

    expect(match.isLive()).toBe(true);

    jest.advanceTimersByTime(45_000);

    expect(match.isLive()).toBe(true);
    expect(match.getSummaryString()).toBe("Spain: 1 - 1 :Brazil");

    jest.advanceTimersByTime(15_000);

    expect(match.getSummaryString()).toBe("Spain: 2 - 1 :Brazil");
    expect(match.isLive()).toBe(true);

    jest.advanceTimersByTime(30_000);

    expect(match.isLive()).toBe(false);
    expect(match.getSummaryString()).toBe("Spain: 2 - 1 :Brazil");
    expect(match.getTotalAmountOfGoals()).toBe(3);
});
