import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
const GuideContext = createContext();

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

  const [guideHidden, setGuideHidden] = useState(() => {
    return localStorage.getItem("guideHidden") === "true";
  });

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