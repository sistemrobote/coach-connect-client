import { useEffect, useState } from "react";

export function useUserId() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user_id = params.get("user_id");

    if (user_id) {
      localStorage.setItem("strava_user_id", user_id);
      setUserId(user_id);
    } else {
      const savedId = localStorage.getItem("strava_user_id");
      if (savedId) setUserId(savedId);
    }
  }, []);

  return userId;
}
