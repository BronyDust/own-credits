import { useEffect, useState } from "react";
import storage from "../utils/storage";

/**
 * Gives reference to credit object by id in storage
 */
function useCredit(uid: string) {
  const [credit, setCredit] = useState(storage.credits.get(uid));

  useEffect(
    () =>
      storage.addListener((s) => {
        setCredit(s.get(uid));
      }),
    [uid]
  );

  return credit;
}

export default useCredit;
