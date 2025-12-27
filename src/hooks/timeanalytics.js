import { useEffect, useRef } from "react";
import { supabase } from "../auth/supabase"
import axios from "axios"
export default function useTimeAnalytics(submissionUniqueId) {
  const startRef = useRef(Date.now());
  const sentRef = useRef(false);

  useEffect(() => {
    if (!submissionUniqueId) return;

    startRef.current = Date.now();
    sentRef.current = false;

    const sendTime =async () => {
      if (sentRef.current) return;
      sentRef.current = true;

      const timeSpent = Math.floor(
        (Date.now() - startRef.current) / 1000
      );

  //     fetch("http://localhost:3000/api/analytics/time", {
  //       method: "POST",
  //        headers: {
  //   "Content-Type": "application/json",
  //   Authorization: session?.access_token
  //     ? `Bearer ${session.access_token}`
  //     : "",
  // },
  //       body: JSON.stringify({
  //         submissionUniqueId,
  //         timeSpent,
  //       }),
  //       keepalive: true,
  //     });
  const {
  data: { session },
} = await supabase.auth.getSession();

const accessToken = session?.access_token;

await axios.post(
  "https://bynd-backend.onrender.com/api/analytics/time",
  {
    submissionUniqueId,
    timeSpent,
  },
  {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  }
);
     };

    window.addEventListener("beforeunload", sendTime);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendTime();
    });

    return () => sendTime();
  }, [submissionUniqueId]);
}