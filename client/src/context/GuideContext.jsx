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
  const stored = localStorage.getItem("guideHidden");

  // User has an explicit saved preference (from a previous toggle) —
  // always respect it, regardless of device.
  if (stored !== null) {
    return stored === "true";
  }

  // No preference saved yet (first-ever visit): default hidden on
  // mobile, visible everywhere else.
  return isMobileViewport();
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
    }),
    [
      currentPage,
      currentDinosaur,
      guideMood,
      lastAction,
      notifications,
      guideHidden,
      tourActive,
    ]
  );

  useEffect(() => {
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