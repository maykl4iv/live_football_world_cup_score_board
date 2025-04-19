# live_football_world_cup_score_board

## Overview

This project implements a basic match tracking system using TypeScript, where matches can be tracked live (with scores being updated), and a scoreboard is rendered to show both live and finished matches. The system has been designed with modularity and separation of concerns in mind.

### Key Components

-   **Match**: The core class that represents a match, tracks the time, and stores scores.
-   **MatchService**: A service responsible for managing and interacting with multiple matches, including creating, updating scores and fetching live/finished matches.
-   **Scoreboard**: The class responsible for rendering the list of live and finished matches in a console-based output.

## Design Decisions

### 1. **Separation of Concerns**

The `MatchService` class was introduced to handle match-related logic (creating, updating, and sorting matches). The `Scoreboard` class was refactored to focus only on displaying the matches. By doing so, we follow the **Single Responsibility Principle** (SRP) as well as **Dependency Inversion Principle** (DIP), making the code easier to maintain and test.

### 2. **Encapsulation of Match Logic**

All match-related functionality is encapsulated in the `Match` and `MatchService` classes, which means the `Scoreboard` class does not need to know the inner workings of how matches are managed. This promotes **loose coupling** between the components, improving flexibility and reducing the chances of introducing bugs when making changes in one area of the system.

### 3. **Modular Design**

-   The **`Match`** class manages individual match details (teams, score, match duration).
-   The **`MatchService`** class is a service layer that manages multiple matches and provides utility methods for sorting and printing.
-   The **`Scoreboard`** class focuses purely on displaying the matches, delegating the actual business logic (e.g., sorting and match management) to the `MatchService`.

### 4. **Refactoring and TDD**

-   The development approach followed **Test-Driven Development (TDD)**. The `MatchService` class was written with unit tests for its key functionalities (creating a match, updating scores, finishing a match, and fetching live/finished matches). These tests ensure that the core logic is correct and prevents regressions in the future.
-   Sorting logic for matches was initially in the `Scoreboard`, but it was moved to `MatchService` as part of the refactor, since sorting is a core part of managing the match data, not displaying it.

### 5. **Scoreboard Rendering**

The rendering logic was kept in the `Scoreboard` class, but rather than printing matches directly, it now delegates the responsibility to the `MatchService` using the `printMatches` method.

### 6. **Live vs Finished Matches**

-   The `isLive()` method in the `Match` class determines if a match is still ongoing. Matches that are finished are sorted and displayed separately from the live matches. This clear distinction helps in easily identifying the current state of all matches.
-   The scoreboard renders live matches in one section and finished matches in another to provide clarity.

### 7. **Use of TypeScript Features**

-   **Private Fields**: The `Match` class uses private fields for encapsulating internal state (e.g., `#startTime`, `#interval`) to ensure that the state cannot be changed from outside the class.
-   **Type Safety**: Types for match and event objects are defined using TypeScript interfaces, ensuring better maintainability and fewer runtime errors.

## How It Works

### 1. **Match Creation**

When a new match is started (via an event of type `start`), the `Scoreboard` calls the `MatchService` to create a match using `createMatch(homeTeam, awayTeam)`. If a match already exists, it will not create a new one.

### 2. **Score Updates**

When an event of type `score` is received, the `Scoreboard` calls the `updateScore(homeTeam, awayTeam, homeScore, awayScore)` method in `MatchService`. This updates the score of the ongoing match.

### 3. **Match Completion**

Matches are finished by themself, when 90 seconds passed.

### 4. **Live and Finished Matches**

-   **Live Matches**: The `Scoreboard` class renders live matches by fetching them from `MatchService` using `getLiveMatches()`.
-   **Finished Matches**: Finished matches are fetched from `MatchService` using `getFinishedMatches()` and are rendered separately.

### 5. **Ticker**

The `Scoreboard` starts a ticker that updates every second. It will stop once all live matches have finished.

### 6. **Sorting Matches**

Matches are sorted by total goals (from highest to lowest). If two matches have the same score, they are sorted by their start time, with the most recent matches appearing first. This sorting happens in the `MatchService` class via the `sortMatches()` method.

## Conclusion

This approach provides a clean, modular structure that separates concerns effectively between match management and the scoreboard display logic. By encapsulating the match logic in the `MatchService` class, we achieve **maintainability**, **reusability**, and **testability**.

In summary:

-   **Match** class handles the core match data and logic.
-   **MatchService** class is responsible for managing multiple matches, updating scores, sorting, and printing.
-   **Scoreboard** class focuses on rendering the matches.

This design allows for easy future modifications, such as adding new match types, events, or even extending the system to support other features like notifications or real-time updates.
