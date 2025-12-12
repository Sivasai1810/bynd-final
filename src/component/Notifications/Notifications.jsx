// import { useEffect, useState } from "react";
// import axios from "axios";
// import NotificationList from "./NotificationList";
// import NotificationEmptyState from "../EmptyState/Notification";
// import "./notification.css";

// export default function Notifications({ userId }) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
// console.log(userId)
//   useEffect(() => {
//     if (!userId) return;

//     async function loadNotifications() {
//       try {
//         const res = await axios.get("http://localhost:3000/fetchnotification", {
//           params: { user_id: userId },
//           withCredentials: true,
//         });

//         setNotifications(res.data.notifications || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//         setLoading(false);
//       }
//     }

//     loadNotifications();
//   }, [userId]);

//   if (loading) return <p>Loading...</p>;

//   if (notifications.length === 0) {
//     return <NotificationEmptyState />;
//   }

//   return <NotificationList notifications={notifications} />;
// }
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "./NotificationList";
import NotificationEmptyState from "../EmptyState/Notification";
import NotificationSkeleton from "./NotificationSkeleton";  // <--- ADD THIS
import "./notification.css";

export default function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function loadNotifications() {
      try {
        const res = await axios.get("https://bynd-backend.onrender.com/fetchnotification", {
          params: { user_id: userId },
          withCredentials: true,
        });

        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [userId]);

 if (loading) {
  return (
    <div className="notification-loading-container">
      <div className="notification-loader"></div>
      <p className="notification-loading-text">Loading notifications...</p>
    </div>
  );
}


  // If no notifications
  if (notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return <NotificationList notifications={notifications} />;
}
