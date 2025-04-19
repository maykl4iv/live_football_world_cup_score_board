import { Scoreboard } from "./Scoreboard";
import { EventsTypes } from "./types";

const matchOne = { home: "Spain", away: "Brazil" };
const matchTwo = { home: "Italy", away: "England" };
const scoreboard = new Scoreboard();

scoreboard.feed({
    type: EventsTypes.start,
    homeTeam: matchOne.home,
    awayTeam: matchOne.away,
});
scoreboard.startTicker();

setTimeout(() => {
    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchTwo.home,
        awayTeam: matchTwo.away,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchOne.home,
        awayTeam: matchOne.away,
        homeScore: 1,
        awayScore: 0,
    });
}, 30_000);

setTimeout(() => {
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchTwo.home,
        awayTeam: matchTwo.away,
        homeScore: 1,
        awayScore: 0,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchTwo.home,
        awayTeam: matchTwo.away,
        homeScore: 1,
        awayScore: 1,
    });
}, 60_000);
