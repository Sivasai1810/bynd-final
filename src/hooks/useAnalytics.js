import { useEffect } from "react";
import generateDeviceFingerprint from "../utils/devicesfingerprint.js";

export default function useAnalytics(submissionUniqueId) {
  useEffect(() => {
    if (!submissionUniqueId) return;

    const sessionKey = `viewed_${submissionUniqueId}`;
    if (sessionStorage.getItem(sessionKey)) return;

    sessionStorage.setItem(sessionKey, "1");

    async function track() {
      try {
        const fp = await generateDeviceFingerprint();
// https://bynd-backend.onrender.com
      await fetch("https://bynd-backend.onrender.com/api/analytics/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    submissionUniqueId, 
    ...fp,
  }),
});
      
      } catch (err) {
        console.error("Analytics failed:", err);
      }
    }

    track();
  }, [submissionUniqueId]);
}