import { useEffect, useRef } from "react";

export default function useTimeAnalytics(submissionUniqueId) {
  const startRef = useRef(Date.now());
  const sentRef = useRef(false);

  useEffect(() => {
    if (!submissionUniqueId) return;

    startRef.current = Date.now();
    sentRef.current = false;

    const sendTime = () => {
      if (sentRef.current) return;
      sentRef.current = true;

      const timeSpent = Math.floor(
        (Date.now() - startRef.current) / 1000
      );

      fetch("https://bynd-backend.onrender.com/api/analytics/time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionUniqueId,
          timeSpent,
        }),
        keepalive: true,
      });
    };

    window.addEventListener("beforeunload", sendTime);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendTime();
    });

    return () => sendTime();
  }, [submissionUniqueId]);
}
