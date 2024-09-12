# FetchTakeHome

A repo containing the FetchRewards takehome work.

# Installation

## Assumptions

-   You're running a \*nix based system
-   You have [nvm](https://github.com/nvm-sh/nvm) installed. If not [click me!](https://github.com/nvm-sh/nvm)
-   -   This should also install `npm` by default (it did for me)

## Install Script

Please run the setup script to get everything situated

```bash
./setup.sh
```

## API Key & You

Please create and place a `.env` file in the root directory and format it like so:

```env
API_KEY=<Your Key Here>
```

# How to Run It

## Through the CLI directly

(this is my preferred way to run it)

```bash
node dist/src/GeoToLatLong.js "Sacramento, California" "80026" "Boulder, Colorado"
```

## Within node/ package.json

Simply run:

```bash
npm run geotolatlong -- "Boulder, Colorado" "80026"
```

# How to Test it

Simply run:

```bash
npm run test
```

# Comments

## Pitfalls

-   I realize there are some glaring issues with code-quality and code-duplication. Given the nature of these endpoints being separate, and having different response bodies, I was inclined to separate them, as the logic to combine it might have been just as messy.
-   The API treats 2 digit state codes as if they weren't entered, this required a LUT of sorts to address and replace with full state-names. This took up more time than I'd like to admit.
-   There are some lingering issues around these state codes and their interactions with cities that contain spaces. This could be remedied with more time by encoding spaces for city names as + but this is another improvement that I don't have time for.
-   There are numerous edge-cases around the API and expected results from bad ZIP codes, military ZIP codes, cities that don't exist, etc. that I didn't have the time to figure out how to mock and write those scenarios in Jest.

## Things I'm Proud Of

-   This repo is very approachable and the setup script should let you hit the ground running.
-   For my first time using Jest I'm happy with my work.
-   Having linting and prettier also setup to ensure consistent code-quality throughout the repo.
