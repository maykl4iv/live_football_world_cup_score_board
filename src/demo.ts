import { Scoreboard } from "./Scoreboard";
import { EventsTypes } from "./types";

const matchOne = { home: "Mexico", away: "Canada" };
const matchTwo = { home: "Germany", away: "France" };
const matchThree = { home: "Spain", away: "Brazil" };
const matchFour = { home: "Uruguay", away: "Italy" };
const matchFive = { home: "Argentina", away: "Australia" };

const scoreboard = new Scoreboard();

scoreboard.feed({
    type: EventsTypes.start,
    homeTeam: matchOne.home,
    awayTeam: matchOne.away,
});
scoreboard.feed({
    type: EventsTypes.start,
    homeTeam: matchTwo.home,
    awayTeam: matchTwo.away,
});
scoreboard.feed({
    type: EventsTypes.start,
    homeTeam: matchThree.home,
    awayTeam: matchThree.away,
});
scoreboard.startTicker();

setTimeout(() => {
    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchFour.home,
        awayTeam: matchFour.away,
    });
    scoreboard.feed({
        type: EventsTypes.start,
        homeTeam: matchFive.home,
        awayTeam: matchFive.away,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchOne.home,
        awayTeam: matchOne.away,
        homeScore: 0,
        awayScore: 2,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchTwo.home,
        awayTeam: matchTwo.away,
        homeScore: 1,
        awayScore: 1,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchThree.home,
        awayTeam: matchThree.away,
        homeScore: 4,
        awayScore: 1,
    });
}, 30_000);

setTimeout(() => {
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchOne.home,
        awayTeam: matchOne.away,
        homeScore: 0,
        awayScore: 5,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchTwo.home,
        awayTeam: matchTwo.away,
        homeScore: 2,
        awayScore: 2,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchThree.home,
        awayTeam: matchThree.away,
        homeScore: 10,
        awayScore: 2,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchFour.home,
        awayTeam: matchFour.away,
        homeScore: 6,
        awayScore: 6,
    });
    scoreboard.feed({
        type: EventsTypes.score,
        homeTeam: matchFive.home,
        awayTeam: matchFive.away,
        homeScore: 3,
        awayScore: 1,
    });
}, 60_000);
