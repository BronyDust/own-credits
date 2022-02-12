import { useEffect, useState } from "react";
import storage, { CreditsMap } from "../utils/storage";

/** Connect to credits storage */
function useStorage(): CreditsMap;
function useStorage<T>(normalizer: (data: CreditsMap) => T): T;
function useStorage<T>(normalizer?: (data: CreditsMap) => T) {
  const [[credits], setCredits] = useState([storage.credits]);

  useEffect(
    () =>
      storage.addListener((data) => {
        setCredits([data]);
      }),
    [normalizer],
  );

  return normalizer ? normalizer(credits) : credits;
}

export default useStorage;
