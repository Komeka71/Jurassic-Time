# Real schema mapping used by profile.controller.js

No new models needed -- everything reuses your existing collections.

| Profile page needs | Real source |
|---|---|
| username, email, avatar, verified, join date | `User` (auth model) via `req.user` (JWT cookie, `protect` middleware) |
| badges / achievements | `User.badges` (array of strings -- just names, no description/unlocked-date catalog exists) |
| points, quizStats.maxScore/maxStreak | `User.points`, `User.quizStats` |
| xp, level, coins, streaks | `UserStats` (found by `username` string, separate collection) |
| discovered dinosaurs | `UserStats.discoveredDinosaurs` (array of id strings) -- cross-reference against `client/src/data/dinosaurs.js` for name/image/rarity |
| purchased/equipped shop items | `UserStats.purchasedItems` / `.equippedItems` -- cross-reference against `client/src/data/shopItems.js` for name/image/price |
| daily missions | `DailyMission` (one doc per username+date, embedded `missions[]`) -- claim by **title**, not id |
| recent quizzes | `QuizAttempt` (only has username/score/totalQuestions/createdAt right now -- no topic/difficulty/xpEarned/coinsEarned/timeTaken despite the quiz submit route sending them; add those fields to the schema if you want them to actually persist) |
| discoveries | `Discovery`, matched via `signature === username` (the journal's signature field is free text, not a real foreign key -- confirm this is reliable in your data, or tell me the real linkage) |
| expedition/level progress | **no schema for this exists yet** -- `expedition: []` is returned empty; add a field if you want this section populated |

## If you want darkMode / notifications / language / privacy to actually persist

Add to `UserStats` schema:

```js
settings: {
  darkMode: { type: Boolean, default: true },
  notifications: { type: Boolean, default: true },
  language: { type: String, default: "English" },
  privacy: { type: String, default: "Public" },
}
```

and a route to update them (same pattern as the existing `/sound` route).
