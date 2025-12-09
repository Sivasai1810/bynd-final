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



// import { useEffect, useRef } from "react";
// import generateDeviceFingerprint from "../utils/devicesfingerprint";

// export default function useAnalytics(submissionUniqueId) {
//   const startTimeRef = useRef(null);
//   const sentRef = useRef(false);
//   const viewedOnceRef = useRef(false); // ✅ IMPORTANT

//   useEffect(() => {
//     if (!submissionUniqueId) return;

//     // ✅ prevents React strict-mode double run
//     if (viewedOnceRef.current) return;
//     viewedOnceRef.current = true;

//     startTimeRef.current = Date.now();
//     sentRef.current = false;

//     /* ---------- VIEW TRACKING (ONCE ONLY) ---------- */
//     const sessionKey = `viewed_${submissionUniqueId}`;

//     if (!sessionStorage.getItem(sessionKey)) {
//       sessionStorage.setItem(sessionKey, "1");

//       (async () => {
//         const fp = await generateDeviceFingerprint();

//         await fetch("http://localhost:3000/api/analytics/track", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             submissionUniqueId,
//             ...fp,
//           }),
//         });
//       })();
//     }

//     /* ---------- TIME TRACKING ---------- */
//     const sendTime = () => {
//       if (sentRef.current) return;
//       sentRef.current = true;

//       const timeSpent = Math.floor(
//         (Date.now() - startTimeRef.current) / 1000
//       );

//       fetch("http://localhost:3000/api/analytics/time", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           submissionUniqueId,
//           timeSpent,
//         }),
//         keepalive: true,
//       });
//     };

//     window.addEventListener("beforeunload", sendTime);
//     document.addEventListener("visibilitychange", () => {
//       if (document.visibilityState === "hidden") sendTime();
//     });

//     return () => {
//       sendTime();
//       window.removeEventListener("beforeunload", sendTime);
//     };
//   }, [submissionUniqueId]);
// }
