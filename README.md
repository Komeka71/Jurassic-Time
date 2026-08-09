# 🦖 PALEORA

> **Explore. Discover. Learn. Evolve.**
>
> PALEORA is an interactive paleontology platform that combines education, exploration, gamification, a virtual museum, fossil discovery, research workflows, AI assistance, and a persistent player progression system into one dinosaur-focused experience.

---

## 🌎 What is PALEORA?

PALEORA is designed as a **digital paleontology world**, rather than a conventional information website.

Users can:

- explore prehistoric eras and dinosaurs
- learn through interactive quizzes
- build a dinosaur collection
- complete expeditions and mini-games
- visit a virtual museum
- explore fossil locations on maps
- submit fossil discoveries
- receive AI-assisted fossil analysis
- participate in a research/community network
- earn XP, fossil coins, levels, streaks, and badges
- customize a dinosaur companion/profile
- buy and equip items from the Dino Shop
- complete daily missions
- use an AI paleontology assistant
- explore a DNA laboratory experience
- follow a prehistoric timeline
- search the PALEORA knowledge collections

The experience is intentionally built around **discovery and progression** so that learning paleontology feels like an expedition.

---

# ✨ Core Features

## 🏠 Interactive Landing Experience

The landing page introduces PALEORA as an immersive prehistoric world.

It includes:

- cinematic hero section
- animated/cursor-based interactions
- dinosaur companion
- skeleton/specimen exploration
- interactive specimen selector
- timeline preview
- map preview
- daily challenge
- mini-games preview
- community preview
- genetics/DNA preview
- research preview
- Hybrid Lab preview
- responsive navigation
- animated backgrounds and visual effects

The landing experience is designed to guide users from **curiosity → exploration → learning → gameplay → research**.

---

# 🦕 Dino Guide / Companion

PALEORA includes an interactive dinosaur guide that accompanies the user throughout the experience.

The guide system contains:

- animated dinosaur player
- speech bubbles
- contextual messages
- page-specific messages
- action messages
- dinosaur-specific messages
- guide behaviour engine
- guide toggle
- video mapping
- contextual reactions

The companion can be integrated into different pages instead of behaving like a static mascot.

---

# 🔐 Authentication & Onboarding

PALEORA includes a complete user-entry flow:

- Login
- Signup
- OTP verification
- authentication state
- protected routes
- onboarding
- user preferences
- profile management

### Onboarding personalization

The user can provide:

**Age group**
- Kid
- Teen
- Adult

**Purpose**
- Learning
- Research
- Fun
- Teaching

**Interests**
- Carnivores
- Flying reptiles
- Marine reptiles
- Fossils / geology
- Extinction science

The backend stores these preferences so PALEORA can personalize the experience.

The user can also configure a dinosaur companion with:

- companion ID
- companion name
- gender
- visual/color preferences

---

# 🧭 Exploration & Navigation

PALEORA is organized as a connected exploration world.

Major destinations include:

- Home
- Museum
- Museum Archive
- Timeline
- DNA Lab
- Expedition
- Quiz
- Map
- Camp
- Dino Shop
- Collection
- Leaderboard
- Research Hub
- Search
- Profile
- Daily Missions
- Mini-Games

---

# 🧠 Quiz Academy

The quiz system is one of PALEORA's main learning/gameplay systems.

Users can:

- answer paleontology questions
- select quiz topics
- select difficulty
- track score
- track accuracy
- track time
- earn XP
- earn fossil coins
- build streaks
- view quiz results
- save quiz attempts
- improve their player level

Questions support metadata such as:

- category
- difficulty
- topic
- fact
- story
- dinosaur message
- XP
- coins

### Quiz progression

Quiz performance contributes to the player's persistent statistics.

Tracked data includes:

- quizzes played
- highest score
- XP
- fossil coins
- level
- quiz history
- current streak
- longest streak

---

# 🎮 Mini-Games

PALEORA includes dedicated dinosaur/paleontology mini-games.

## 🐾 Dino Track Detective

Players investigate dinosaur tracks and identify what happened from prehistoric evidence.

Includes:

- track trails
- investigation questions
- question panel
- introductory sequence
- results
- completion screen
- Museum AI interaction
- dedicated gameplay data

Route:

`/mini-games/dino-track-detective`

---

## 🕰️ Era Sorting

Players learn geological eras by sorting dinosaurs into their correct time periods.

The game uses dinosaur/era datasets and interactive gameplay.

Route:

`/mini-games/era-sorting`

---

## ⛏️ Fossil Excavation

Players perform a virtual fossil excavation.

Gameplay includes:

- dig-site selection
- excavation
- scanning sequence
- fossil evidence
- fossil artwork
- specimen cards
- collection updates
- museum result cards

Route:

`/mini-games/fossil-excavation`

---

# 🗺️ Maps & Expeditions

PALEORA includes interactive exploration maps.

The map system supports:

- prehistoric locations
- map nodes
- paths
- discoveries
- expedition cards
- discovery cards
- expedition progression
- map pins
- discovery metadata
- exploration rewards

There are also map-based research/exploration interfaces inside the Research Hub.

---

# 🧭 Expedition System

Expeditions form part of the player's progression.

The system supports:

- expedition selection
- expedition cards
- expedition completion
- progression levels
- expedition statistics
- expedition history
- rewards
- XP progression

The player's profile includes an expedition timeline.

---

# ⛺ Camp

The Camp acts as a player-oriented hub.

It contains:

- camp hero
- camp cards
- camp statistics
- player progression information
- personalized gameplay content

Route:

`/camp`

---

# 🏛️ PALEORA Museum

PALEORA includes a dedicated virtual museum experience.

Museum functionality includes:

- museum landing experience
- museum categories
- featured museums
- featured exhibits
- exhibit viewer
- exhibit pages
- museum archive
- galleries
- museum collections
- museum spotlight
- museum timeline
- world map
- virtual tour
- museum visit information
- audio guide
- audio guide context
- core sample rail
- museum footer

Users can navigate from the museum into individual exhibits and exhibit-specific pages.

---

# 🦴 Dinosaur Collection

The Collection system lets players build a persistent dinosaur collection.

Supported functionality includes:

- discovered dinosaurs
- collection grid
- collection cards
- dinosaur inspection
- dinosaur details
- collection popups
- collection hero
- unlock/progression rules

Current backend unlock examples include:

| Dinosaur | Required Level |
|---|---:|
| Velociraptor | 1 |
| Triceratops | 1 |
| Stegosaurus | 2 |
| Brachiosaurus | 3 |
| Spinosaurus | 4 |
| Tyrannosaurus | 5 |

The backend uses atomic `$addToSet` behavior to prevent duplicate dinosaur discoveries.

---

# 🛍️ Dino Shop

PALEORA has a game-style shop where users spend **fossil coins**.

The shop includes:

- shop hero
- item inspection
- parallax shop cards
- cart drawer
- cart animation
- equipped items
- purchased items
- inventory integration

Items have properties such as:

- name
- category
- price
- rarity
- required level
- avatar slot
- description

Examples of item categories include:

- gear
- relics
- accessories

Purchases and equipment are persisted through the backend.

---

# 🏆 Leaderboard

PALEORA includes a competitive leaderboard system.

It supports:

- ranked players
- podium presentation
- leaderboard rows
- player statistics
- research/community rankings

The Research Hub also contains a researcher leaderboard and contributor cards.

---

# 🎯 Daily Missions & Streaks

Daily missions create recurring goals for players.

Current mission examples include:

- Complete 1 Expedition
- Answer 10 Questions
- Earn 100 XP

Missions have:

- goal
- progress
- reward XP
- reward coins
- completion state
- claimed state

Players also have:

- current daily streak
- longest streak
- last played date

A backend daily mission reset utility is included.

---

# ⭐ XP, Levels & Rewards

PALEORA uses persistent player progression.

Tracked progression includes:

- XP
- level
- fossil coins
- unlocked levels
- streaks
- discovered dinosaurs
- purchased items
- equipped items
- badges

The backend contains level/progression utilities and expedition progression data.

> **Implementation note:** the repository currently contains more than one progression utility/XP table from different iterations of the system. When extending the project, keep one canonical XP/level formula to avoid frontend/backend drift.

---

# 🔬 Research Hub

The Research Hub turns PALEORA from a learning game into a collaborative paleontology environment.

It includes:

- research map room
- ancient map
- expedition pins
- archive statistics
- activity feed
- discovery network
- discovery cards
- discovery drawer
- verification interface
- evidence tab
- overview tab
- AI analysis tab
- discussion tab
- status badges
- researcher leaderboard
- researcher cards
- contributor statistics
- research activity
- network statistics
- network health

---

# 🧭 Community Fossil Discoveries

Users can submit their own fossil discoveries.

A discovery can contain:

- fossil name
- location
- latitude
- longitude
- geological era
- species
- notes
- evidence images
- signature
- uploader
- verification status

Discovery states include:

- Field Draft
- Under Review
- Verified
- Rejected
- Featured

Users can also:

- view discoveries
- like/upvote discoveries
- comment
- view comments
- explore archive statistics
- view community activity
- view top contributors

---

# 🤖 AI-Assisted Fossil Verification

PALEORA integrates Gemini-powered image analysis for fossil submissions.

The AI analysis considers:

1. image quality
2. fossil detection
3. species match
4. geological consistency
5. preservation quality
6. specimen type
7. authenticity
8. possible manipulation/AI generation
9. duplicate risk
10. overall confidence

The system can classify an image as possibilities such as:

- authentic fossil
- museum display
- reconstructed skeleton
- fossil cast
- replica
- artwork
- CGI
- AI-generated image
- toy/model
- unrelated material

The result is stored as part of the discovery verification record.

### Verification workflow

```text
Discovery Submitted
        ↓
AI Analysis
        ↓
Community Review
        ↓
Museum Archive
```

This creates a bridge between **AI assistance and human/community verification** rather than treating AI output as unquestionable truth.

---

# 🧠 PALEORA AI Assistant

PALEORA includes an AI chat assistant designed around paleontology.

The assistant can receive contextual information such as:

- current dinosaur
- dinosaur label
- current page
- user's purpose
- interests
- guide context
- hero context
- username

This allows the assistant to respond within the context of the user's PALEORA journey.

Frontend chat components include:

- chat header
- chat messages
- message bubbles
- typing indicator
- suggestion chips
- chat input
- chatbot container

---

# 🧬 DNA Laboratory

The DNA Laboratory provides an interactive fictional/scientific exploration experience.

The codebase contains dedicated DNA lab systems for:

- specimen selection
- parent selection
- extraction
- specimen cards
- fusion
- fusion authorization
- emergency confirmation
- abort sequence
- research wing
- shared controls
- status interfaces

The experience is designed as an interactive **prehistoric genetics laboratory** rather than a real-world genetic engineering tool.

Route:

`/dna-lab`

---

# 🕰️ Geological Timeline

PALEORA contains an interactive prehistoric timeline.

Users can:

- explore geological eras
- open individual era pages
- browse era-specific content
- connect timeline content to dinosaurs and discoveries

Routes:

```text
/timeline
/timeline/:era
```

---

# 🔎 Search

PALEORA includes a search system with registered knowledge collections.

The frontend contains:

- search service
- collection registration
- dinosaur collection data
- search page
- search result components

The search system is intended to provide a unified way to navigate the growing PALEORA knowledge base.

---

# 👤 Player Profile

The profile is designed as a **prehistoric explorer passport**.

It can surface:

- player information
- dinosaur collection
- discoveries
- research contributions
- quiz performance
- recent quizzes
- daily missions
- achievements
- statistics
- shop inventory
- expedition timeline
- account information
- settings

Tracked profile statistics include:

- completed quizzes
- discoveries
- verified discoveries
- museum visits
- expeditions
- current streak
- highest streak
- research points
- XP
- level
- coins
- badges

---

# 🎨 Personalization

PALEORA contains personalization utilities that can influence the home experience.

The codebase includes logic for:

- user progress
- player progress
- home page layout
- homepage sections
- personalized content
- hero content
- map discovery
- map pins
- user preferences

The long-term goal is for PALEORA to feel different depending on the user's:

- age group
- purpose
- interests
- progress
- discoveries
- companion

---

# 🎵 Audio & Immersion

The frontend includes an audio context and audio-related UI.

The project supports:

- background/music preferences
- effects preferences
- page/game sounds
- audio guide experiences
- sound controls

The player stats model stores music/effects preferences.

---

# 🎬 Visual Experience

PALEORA uses a highly visual interface with:

- animated backgrounds
- video backgrounds
- dinosaur animations
- motion effects
- Framer Motion
- Three.js / React Three Fiber
- React Three Drei
- Leaflet maps
- custom CSS themes
- particles
- cursor glow
- skeleton interactions
- responsive layouts

The project uses a mixture of:

- React components
- CSS
- Tailwind
- custom theme variables
- animated media
- generated visual assets

---

# 🧱 Technology Stack

## Frontend

- React
- Vite
- React Router
- Framer Motion
- Three.js
- React Three Fiber
- React Three Drei
- Leaflet
- React Leaflet
- Tailwind CSS
- Lucide React
- React Icons
- React Markdown
- React Hot Toast
- React Confetti
- React Type Animation
- Axios

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Cookie Parser
- Multer
- Cloudinary integration
- Nodemailer/email utilities
- JWT/token utilities
- bcrypt
- node-cron/daily mission utilities
- Google Gemini API

---

# 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      PALEORA UI     │
                    │       React/Vite    │
                    └──────────┬──────────┘
                               │
                         Axios / HTTP
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express API      │
                    │      Node.js         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼─────────────────┐
              │                │                 │
              ▼                ▼                 ▼
        ┌──────────┐     ┌───────────┐    ┌─────────────┐
        │ MongoDB  │     │ Cloudinary│    │ Gemini APIs │
        │ Mongoose │     │  Media    │    │ AI / Vision │
        └──────────┘     └───────────┘    └─────────────┘
```

---

# 📂 Project Structure

The current source package is organized approximately as:

```text
PALEORA/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── collection/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── background/
│   │   │   ├── camp/
│   │   │   ├── chat/
│   │   │   ├── collection/
│   │   │   ├── dnalab/
│   │   │   ├── guide/
│   │   │   ├── landing/
│   │   │   ├── map/
│   │   │   ├── museum/
│   │   │   ├── profile/
│   │   │   ├── quiz/
│   │   │   └── ResearchHub/
│   │   ├── context/
│   │   ├── games/
│   │   │   ├── DinoTrackDetective/
│   │   │   ├── EraSorting/
│   │   │   └── FossilExcavation/
│   │   ├── leaderboard/
│   │   ├── pages/
│   │   ├── search/
│   │   ├── services/
│   │   ├── shop/
│   │   ├── styles/
│   │   └── utils/
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── models/
├── routes/
├── main.jsx
├── server.js
├── index.html
├── package.json
└── README.md
```

---

# 🗄️ Backend Data Models

The backend currently contains models for:

- `User`
- `UserStats`
- `Question`
- `QuizAttempt`
- `DailyMission`
- `Discovery`
- `Comment`
- `ActivityLog`

### User

Stores:

- authentication information
- verification state
- onboarding preferences
- companion
- profile
- progression
- quiz statistics
- research points
- coins
- XP
- level
- unlocked levels
- shop inventory
- badges
- role

### UserStats

Stores persistent gameplay progress:

- quizzes played
- highest score
- XP
- level
- coins
- daily streak
- longest streak
- discovered dinosaurs
- purchased items
- equipped items
- expedition levels
- sound preferences

### Discovery

Stores community fossil submissions and verification data.

It includes:

- archive ID
- fossil information
- location/GPS
- evidence
- status
- moderation
- AI verification
- verification timeline
- likes
- comments
- featured state

---

# 🔌 Main API Areas

The Express backend exposes API groups for:

```text
/api/auth
/api/users
/api/user
/api/quiz
/api/questions
/api/leaderboard
/api/daily
/api/collection
/api/discoveries
/api/chat
/api/admin
```

Examples:

```text
POST  /api/quiz/submit

GET   /api/daily/:username
PATCH /api/daily/:username/progress
PATCH /api/daily/:username/claim

GET   /api/user/:username/shop
POST  /api/user/:username/shop/buy
PATCH /api/user/:username/shop/equip

POST  /api/collection/:username/discover

GET   /api/discoveries
GET   /api/discoveries/latest
GET   /api/discoveries/archive-stats
POST  /api/discoveries
POST  /api/discoveries/:id/like
GET   /api/discoveries/:id/comments
POST  /api/discoveries/:id/comments

POST  /api/chat
```

---

# 🛡️ Security & Backend Protection

The project includes:

- password hashing with bcrypt
- protected API routes
- authentication middleware
- JWT/token utilities
- OTP utilities
- HTTP-only cookie support
- CORS configuration
- upload middleware
- error middleware
- admin route protection
- server-side level/unlock validation

Important game rules are enforced server-side where appropriate.

For example, dinosaur discovery is not trusted solely to the frontend: the backend checks the player's level before unlocking a dinosaur.

---

# 👑 Admin System

PALEORA includes an administrative interface for managing the platform.

Admin functionality includes:

- dashboard
- users
- logs
- quizzes
- discoveries
- administrative route protection

This provides a foundation for moderation and content management.

---

# 📱 Responsive Experience

The project contains dedicated responsive layouts across:

- landing
- quiz
- map
- museum
- profile
- shop
- collection
- mini-games
- research hub
- DNA lab

The UI is designed for desktop and smaller screens while maintaining the immersive visual identity.

---

# 🚀 Running PALEORA Locally

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd PALEORA
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

If the project is using the root package configuration instead, install from the project root as appropriate.

---

# 🔐 Environment Variables

Never commit real secrets.

Create the appropriate `.env` files locally.

Typical backend configuration includes values such as:

```env
MONGO_URI=
PORT=3000
FRONTEND_URL=
GEMINI_API_KEY=
GEMINI_VISION_API_KEY=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Use your actual project configuration when deploying.

---

# ▶️ Start the Backend

From the backend directory:

```bash
node server.js
```

or, where configured:

```bash
npm run server
```

The API normally runs on:

```text
http://localhost:3000
```

---

# ▶️ Start the Frontend

From the client directory:

```bash
npm run dev
```

Vite normally serves the frontend at:

```text
http://localhost:5173
```

---

# 🏭 Production Build

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

---

# ☁️ Deployment

The current backend CORS configuration includes support for:

- local Vite development
- the PALEORA Vercel deployment
- Vercel preview deployments
- an environment-defined frontend URL

The frontend is structured for Vite-based deployment.

---

# 🧪 Development Notes

PALEORA has grown through multiple feature iterations. Some areas of the repository contain legacy/transition files and overlapping utilities.

Before making major changes:

1. identify the active route
2. identify the active API
3. identify the canonical model
4. check whether a newer component already exists
5. avoid deleting apparently duplicated files without checking imports
6. keep progression calculations consistent between client and server

---

# 🗺️ Feature Map

```text
                         PALEORA
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
     EXPLORE             LEARN              PLAY
        │                   │                   │
   ┌────┼────┐         ┌────┼────┐        ┌────┼────┐
   │    │    │         │    │    │        │    │    │
 Museum Map Timeline   Quiz Search DNA    Tracks Era Fossils
   │    │    │                         │
   │    │    └──────────────┐          │
   │    └──── Expeditions ──┤          │
   │                        │          │
   └────────── Collection ──┴──────────┘
                            │
                         PROGRESS
                            │
               ┌────────────┼────────────┐
               │            │            │
              XP         Coins        Levels
               │            │            │
            Streaks       Shop        Badges
                            │
                         PROFILE
                            │
                    ┌───────┴────────┐
                    │                │
               RESEARCH          COMMUNITY
                    │                │
             Discoveries        Comments
             AI Analysis        Likes
             Verification       Activity
                    │                │
                    └───────┬────────┘
                            │
                         MUSEUM
```

---

# 🎯 Design Philosophy

PALEORA is built around five principles:

### 1. Discovery over documentation

Instead of simply reading about dinosaurs, users should feel like they are **discovering** them.

### 2. Learning through interaction

Quizzes, games, maps, museum exhibits, timelines, and simulations turn paleontology into an active experience.

### 3. Progression creates motivation

XP, levels, coins, streaks, collections, badges, expeditions, and unlocks give users a reason to continue exploring.

### 4. AI assists rather than replaces

AI can explain, analyze, contextualize, and assist with fossil submissions, while community and museum workflows remain part of the verification process.

### 5. One connected prehistoric world

The Museum, Map, Collection, Camp, Research Hub, Quiz, Shop, DNA Lab, and Mini-Games are intended to feel like parts of the same PALEORA universe.

---

# 🔮 Future Expansion

Potential future directions include:

- richer AI personalization
- deeper museum exhibits
- more dinosaur species
- additional fossil sites
- more mini-games
- expanded expedition maps
- stronger researcher collaboration
- improved fossil verification
- richer achievement systems
- additional companion animations
- more DNA Lab scenarios
- multiplayer/community activities
- expanded educational content
- stronger accessibility
- unified progression architecture
- mobile/PWA improvements

---

# 🧑‍💻 Project Status

PALEORA is an actively developed interactive paleontology platform.

The current repository already contains substantial functionality across:

- education
- gaming
- exploration
- personalization
- museum experiences
- research
- AI
- community
- progression
- e-commerce-style rewards/shop
- administration

---

# 🦖 PALEORA

**A digital prehistoric world where learning becomes an expedition.**

> Explore the past.  
> Discover the unknown.  
> Build your collection.  
> Become a paleontologist.

