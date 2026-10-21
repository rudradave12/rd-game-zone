export const TOP_TEN_GAME_IDS = [2, 24, 42, 3, 4, 19, 27, 44, 32, 33] as const;

export type TopTenGameId = (typeof TOP_TEN_GAME_IDS)[number];
export type GameHighlightKind = "mode" | "agent" | "map" | "event" | "fighter" | "match";

export type GameHighlight = {
  kind: GameHighlightKind;
  title: string;
  detail: string;
};

export type TopTenGameHighlight = {
  heading: string;
  intro: string;
  items: [GameHighlight, GameHighlight, GameHighlight];
};

export const topTenGameHighlights: Record<TopTenGameId, TopTenGameHighlight> = {
  2: {
    heading: "Build a night in Los Santos",
    intro: "Pick a crew mission, race, or a free-roam goal to get started.",
    items: [
      { kind: "mode", title: "Heists", detail: "Plan a multi-part crew job." },
      { kind: "event", title: "Street races", detail: "Line up for a fast head-to-head run." },
      { kind: "map", title: "Freemode", detail: "Explore the world at your own pace." },
    ],
  },
  24: {
    heading: "Choose your football format",
    intro: "Go straight to a local match or take your team into online play.",
    items: [
      { kind: "match", title: "Kick-Off", detail: "Jump into a quick match." },
      { kind: "event", title: "The Grounds", detail: "Try small-sided street football." },
      { kind: "mode", title: "Clubs", detail: "Play together in a club setup." },
    ],
  },
  42: {
    heading: "Pick a multiplayer mode",
    intro: "Set the rules and squad roles before the first round begins.",
    items: [
      { kind: "mode", title: "Team Deathmatch", detail: "Race to the score limit as a squad." },
      { kind: "mode", title: "Domination", detail: "Capture and hold the objectives." },
      { kind: "mode", title: "Search & Destroy", detail: "Take turns attacking and defending." },
    ],
  },
  3: {
    heading: "Build a balanced agent lineup",
    intro: "Pick a role that suits your team and coordinate your utility.",
    items: [
      { kind: "agent", title: "Jett", detail: "Duelist · fast entry play." },
      { kind: "agent", title: "Sage", detail: "Sentinel · support and defense." },
      { kind: "agent", title: "Omen", detail: "Controller · shape sightlines." },
    ],
  },
  4: {
    heading: "Choose a map and set your roles",
    intro: "Agree on a map, then coordinate your buys and site approach.",
    items: [
      { kind: "map", title: "Dust II", detail: "A classic map for both sides." },
      { kind: "map", title: "Mirage", detail: "Plan your approach around the sites." },
      { kind: "map", title: "Inferno", detail: "Coordinate utility and rotations." },
    ],
  },
  19: {
    heading: "Pick your racing challenge",
    intro: "Switch between solo progression and competitive team events.",
    items: [
      { kind: "mode", title: "Career", detail: "Build your progress through events." },
      { kind: "event", title: "Grand Prix", detail: "Race through a multi-player series." },
      { kind: "match", title: "Team Pursuit", detail: "Race as a crew or chase as security." },
    ],
  },
  27: {
    heading: "Find your way onto the pitch",
    intro: "Choose an international rivalry, a management run, or a squad challenge.",
    items: [
      { kind: "event", title: "The Ashes", detail: "Play through the famous rivalry." },
      { kind: "mode", title: "Management Career", detail: "Set lineups, tactics, and strategy." },
      { kind: "match", title: "Pro Team", detail: "Build a squad and take on challenges." },
    ],
  },
  44: {
    heading: "Choose how the match unfolds",
    intro: "Set a match type and superstar matchup before the bell.",
    items: [
      { kind: "match", title: "Inferno", detail: "A fiery ring-side showdown." },
      { kind: "match", title: "I Quit", detail: "Wear down your rival to win." },
      { kind: "match", title: "Dumpster", detail: "Use the environment to finish it." },
    ],
  },
  32: {
    heading: "Select your fighter",
    intro: "Pick a style, learn the matchup, and settle the score round by round.",
    items: [
      { kind: "fighter", title: "Jin", detail: "A versatile all-round matchup." },
      { kind: "fighter", title: "Kazuya", detail: "A hard-hitting Mishima style." },
      { kind: "fighter", title: "King", detail: "A grappling-focused fighter." },
    ],
  },
  33: {
    heading: "Choose your kombatants",
    intro: "Select a main fighter and a Kameo partner before the match.",
    items: [
      { kind: "fighter", title: "Liu Kang", detail: "A fire-and-lightning champion." },
      { kind: "fighter", title: "Scorpion", detail: "A relentless close-range rival." },
      { kind: "fighter", title: "Sub-Zero", detail: "A precise ice-wielding fighter." },
    ],
  },
};
