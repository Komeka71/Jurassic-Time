import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const GuideContext = createContext();

const MOBILE_BREAKPOINT = 768;

function isMobileViewport() {
if (typeof window === "undefined") return false;
return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getInitialGuideHidden() {
// Mobile always starts hidden, every load — no exceptions, no
// localStorage lookup. The user can still tap the toggle to reveal
// it for that session.
if (isMobileViewport()) return true;

// Desktop/tablet: respect whatever was saved from last time,
// defaulting to visible if nothing's been saved yet.
const stored = localStorage.getItem("guideHidden");
return stored === "true";
}

export function GuideProvider({ children }) {
const [currentPage, setCurrentPage] = useState("hero");

const [currentDinosaur, setCurrentDinosaur] =
useState("trex");

const [guideMood, setGuideMood] =
useState("happy");

const [lastAction, setLastAction] =
useState("");

const [notifications, setNotifications] =
useState([]);

const [guideHidden, setGuideHidden] = useState(getInitialGuideHidden);

// True while an immersive overlay (e.g. VirtualTour) is open,
// so GuideToggle knows to get out of the way.
const [tourActive, setTourActive] = useState(false);

// True only while the user is actively answering a Quiz Arena question
// (i.e. before the reward chest/summary screen appears). Quiz.jsx is the
// source of truth for this — it flips it based on its own showChest
// state. Chatbot reads it to lock Paleo out of quiz-answer content on the
// backend, regardless of how the question is phrased.
const [quizActive, setQuizActive] = useState(false);

const value = useMemo(
    () => ({
currentPage,
setCurrentPage,

currentDinosaur,
setCurrentDinosaur,

guideMood,
setGuideMood,

lastAction,
setLastAction,

notifications,
setNotifications,

guideHidden,
setGuideHidden,

tourActive,
setTourActive,

quizActive,
setQuizActive,
    }),
    [
currentPage,
currentDinosaur,
guideMood,
lastAction,
notifications,
guideHidden,
tourActive,
quizActive,
    ]
  );

// Only persist to localStorage on non-mobile — mobile's hidden state
// is intentionally session-only and always resets on reload.
useEffect(() => {
if (isMobileViewport()) return;
localStorage.setItem(
"guideHidden",
String(guideHidden)
    );
  }, [guideHidden]);

return (
<GuideContext.Provider value={value}>
{children}
</GuideContext.Provider>
  );
}

export function useGuide() {
return useContext(GuideContext);
}