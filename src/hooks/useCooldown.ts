import { useState, useCallback } from "react";
export default function useCooldown(ms: number) {
  const [cooldown, setCooldown] = useState(false);

  const trigger = useCallback(() => {
    if (cooldown) return false;
    setCooldown(true);
    setTimeout(() => setCooldown(false), ms);
    return true;
  }, [cooldown, ms]);

  return trigger;
}
