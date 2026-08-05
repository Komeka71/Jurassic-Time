import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getUserProgress } from "../utils/userProgress";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({
    loggedIn: false,
    level: 1,
    xp: 0,
    coins: 0,
    expeditionLevels: [],
    discoveredDinosaurs: [],
    purchasedItems: [],
    loading: true,
  });

  async function refreshProgress() {
    const data = await getUserProgress();

    setProgress({
      ...data,
      loading: false,
    });
  }

  useEffect(() => {
    refreshProgress();
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}