import { useEffect } from "react";
import { supabase } from "../auth/supabase"
import axios from "axios"
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
//       await fetch("http://localhost:3000/api/analytics/track", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: session?.access_token
//       ? `Bearer ${session.access_token}`
//       : "",
//   },
//   body: JSON.stringify({
//     submissionUniqueId, 
//     ...fp,
//   }),
// });
const {
  data: { session },
} = await supabase.auth.getSession();

const accessToken = session?.access_token;

await axios.post(
  "https://bynd-backend.onrender.com/api/analytics/track",
  {
    submissionUniqueId,
    ...fp,
  },
  {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  }
);
      
      } catch (err) {
        console.error("Analytics failed:", err);
      }
    }

    track();
  }, [submissionUniqueId]);
}
