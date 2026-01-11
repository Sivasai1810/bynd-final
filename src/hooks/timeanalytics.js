import { useEffect, useRef } from "react";
import { supabase } from "../auth/supabase";
export default function useTimeAnalytics(submissionUniqueId,isOwnerView) {
  const startRef = useRef(null);
  const sentRef = useRef(false);
  useEffect(() => {
    if (!submissionUniqueId) return;
    startRef.current = Date.now();
    sentRef.current = false;

    const sendTime = async () => {
      if (sentRef.current || !startRef.current) return;
    const timeSpent = Math.floor(
  (Date.now() - startRef.current) / 1000
);
if (timeSpent < 3) return; 
 sentRef.current = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const accessToken = session?.access_token;

      const payload = JSON.stringify({
  submissionUniqueId,
  timeSpent,
  isOwnerView
});

if (navigator.sendBeacon) {
  navigator.sendBeacon(
    "https://bynd-backend.onrender.com/api/analytics/time",
    payload
  );
} else {
  await fetch(
    "https://bynd-backend.onrender.com/api/analytics/time",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
      },
      body: payload,
      keepalive: true,
    }
  );
}

      } catch (err) {
        console.error("Time analytics send failed:", err);
      }
    };

    // tab close / refresh
    window.addEventListener("beforeunload", sendTime);

    // tab hidden (mobile / background)
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        sendTime();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      sendTime();
      window.removeEventListener("beforeunload", sendTime);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [submissionUniqueId]);
}
