# Jurassic Time — Person 1: Auth & User Flows

This is the auth/user slice of the Web Wonders 2026 "Jurassic Time" project:
login/signup/logout, a protected-route wrapper, the "Dig Site Briefing"
onboarding flow, companion (dino guide) selection, and the profile page with
stats, badges, and editable preferences.

## Stack
- **Backend:** Node, Express, MongoDB (Mongoose), JWT in an httpOnly cookie, bcrypt
- **Frontend:** React (Vite), React Router, Axios

## Project structure

```
jurassic-time-app/
  backend/
    config/db.js            MongoDB connection
    models/User.js          User schema (auth + preferences + companion + stats)
    middleware/authMiddleware.js   protect / adminOnly
    middleware/errorMiddleware.js  central error handling
    controllers/authController.js signup, login, logout, /me
    controllers/userController.js onboarding, profile get/update
    routes/authRoutes.js
    routes/userRoutes.js
    server.js
  frontend/
    src/
      api/axios.js           axios instance (withCredentials: true)
      context/AuthContext.jsx global user state
      components/ProtectedRoute.jsx     redirects to /login if not signed in
      components/RequireOnboarding.jsx  redirects to /onboarding if first-time
      components/CompanionPicker.jsx    dino guide + male/female skin toggle
      components/Navbar.jsx
      pages/Signup.jsx, Login.jsx, Onboarding.jsx, Profile.jsx, Home.jsx
      styles/theme.css        design tokens ("dig site" theme)
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- Set `MONGO_URI` — either a local MongoDB (`mongodb://127.0.0.1:27017/jurassic-time`)
  or a free MongoDB Atlas cluster connection string.
- Generate a `JWT_SECRET`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```

Run it:
```bash
npm run dev
```
It should print `Jurassic Time API running on port 5000` and a MongoDB connected message.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```
Open the printed local URL (usually `http://localhost:5173`).

Vite is configured to proxy `/api/*` requests to `http://localhost:5000`, so
the frontend and backend can run on different ports without CORS headaches
during development.

## Setting up Google Sign-In + email OTP

Both are optional to get the basic app running, but needed for the "Continue
with Google" button and the email verification code to actually work.

**Google Sign-In:**
1. Go to https://console.cloud.google.com/apis/credentials
2. Create a project (or use an existing one) → **Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Under **Authorized JavaScript origins**, add `http://localhost:5173`
5. Copy the generated Client ID into **both**:
   - `backend/.env` → `GOOGLE_CLIENT_ID=...`
   - `frontend/.env` → `VITE_GOOGLE_CLIENT_ID=...` (same value)

**Email OTP (using Gmail):**
1. Turn on 2-Step Verification on the Gmail account you want to send from:
   https://myaccount.google.com/security
2. Generate an App Password: https://myaccount.google.com/apppasswords
   (pick "Mail" as the app — it gives you a 16-character password)
3. In `backend/.env`:
   ```
   EMAIL_USER=youraddress@gmail.com
   EMAIL_PASS=the16charapppassword   # NOT your normal Gmail password
   EMAIL_FROM=youraddress@gmail.com
   ```

Don't have a spare Gmail to use? Any SMTP provider works — just change
`EMAIL_HOST`/`EMAIL_PORT` to match (e.g. Mailtrap for testing without sending
real emails, or a teammate's Gmail + App Password).

## How the auth flow works

1. **Signup** creates the account as **unverified** and emails a 6-digit OTP
   — it does NOT log the user in yet. The frontend is sent to `/verify-otp`.
2. **Verify OTP** checks the code against what's stored on the user (with a
   10-minute expiry), marks the account verified, sends a welcome email, and
   only *then* logs the user in.
3. **Login** with email/password is blocked (`403 needsVerification`) until
   the account is verified — the frontend catches that and routes back to
   `/verify-otp`.
4. **Google Sign-In** skips OTP entirely, since Google has already verified
   the email. The backend verifies the ID token server-side with
   `google-auth-library` (never trusts the frontend blindly), then creates or
   looks up the user by `googleId`/email. If someone already has a local
   account under that email, Google sign-in links to it instead of creating
   a duplicate.
5. However you log in, the backend signs a JWT and sets it as an `httpOnly`
   cookie. The frontend never touches the raw token — it can't be read by
   JS, which protects against token theft via XSS (the classic risk with
   storing tokens in `localStorage`).
6. **Staying logged in** — on app load, `AuthContext` calls `GET /api/auth/me`.
   The browser automatically attaches the cookie; if it's valid, the backend
   returns the user.
7. **Protected routes** — `<ProtectedRoute />` wraps any route that needs a
   logged-in (and verified) user, redirecting to `/login` otherwise and
   remembering where the person was headed.
8. **Onboarding gate** — `<RequireOnboarding />` sits inside the protected
   area and redirects first-time users to `/onboarding` until they finish the
   3-step questionnaire + companion pick.
9. **Welcome moment** — right after OTP verification or a brand-new Google
   sign-in, the backend flags the response `justVerified: true`; the frontend
   uses that to show a one-time "Welcome to Jurassic Time" banner.
10. **Logout** — clears the cookie server-side and resets `user` to `null`.

## Data model notes (for the rest of the team)

`preferences`, `companion`, `quizStats`, `points`, and `badges` all live on
the `User` document so any teammate can read `req.user.preferences` (e.g. to
reorder the homepage feed or set quiz difficulty) without a second lookup.

`quizStats`, `points`, and `badges` are intentionally **not** editable through
`PUT /api/users/profile` — only the quiz/shop features should be able to
write to them. Whoever builds those should update the fields directly on the
`User` model (see `backend/models/User.js`) rather than adding them to the
profile-edit endpoint.

`photo.verified` can only be set to `true` by an admin (add an
`adminOnly`-protected route when the moderation feature is built — the
middleware for it already exists in `authMiddleware.js`).

## Still to build (other slices)
- Species/content listings + search & filter (Person 2?)
- Quiz engine that writes to `quizStats`, `points`, `badges`
- Fossil shop that spends `points`
- Admin approval flow for user contributions and photo verification
