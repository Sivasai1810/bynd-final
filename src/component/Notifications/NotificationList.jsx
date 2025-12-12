// import NotificationCard from "./NotificationCard";

// export default function NotificationList({ notifications }) {
//   if (!Array.isArray(notifications)) {
//     console.error("NotificationList received invalid notifications:", notifications);
//     return null;
//   }

//   return (
//     <div className="notification-page-container">
//       <h2 className="notification-title">Notifications</h2>
//       <h3 className="notification-today-label">Today</h3>

//       <div className="notification-list">
//         {notifications.map((item) => (
//           <NotificationCard key={item.notification_id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

import NotificationCard from "./NotificationCard";

export default function NotificationList({ notifications }) {
  if (!Array.isArray(notifications)) {
    console.error("NotificationList received invalid notifications:", notifications);
    return null;
  }

  // === GROUPING LOGIC ===
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);

  const todayStr = today.toDateString();
  const yesterdayStr = yesterday.toDateString();

  const todayList = [];
  const yesterdayList = [];
  const older = {}; // { "Dec 5, 2025": [notif1, notif2] }

  notifications.forEach((item) => {
    const d = new Date(item.last_viewed_at);
    const dStr = d.toDateString();

    if (dStr === todayStr) {
      todayList.push(item);
    } else if (dStr === yesterdayStr) {
      yesterdayList.push(item);
    } else {
      const label = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      if (!older[label]) older[label] = [];
      older[label].push(item);
    }
  });

  return (
    <div className="notification-page-container">
      <h2 className="notification-title">Notifications</h2>

      {/* TODAY */}
      {todayList.length > 0 && (
        <>
          <h3 className="notification-today-label">Today</h3>
          <div className="notification-list">
            {todayList.map((item) => (
              <NotificationCard key={item.notification_id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* YESTERDAY */}
      {yesterdayList.length > 0 && (
        <>
          <h3 className="notification-today-label">Yesterday</h3>
          <div className="notification-list">
            {yesterdayList.map((item) => (
              <NotificationCard key={item.notification_id} item={item} />
            ))}
          </div>
        </>
      )}

      {/* OLDER */}
      {Object.keys(older).map((dateLabel) => (
        <div key={dateLabel}>
          <h3 className="notification-today-label">{dateLabel}</h3>

          <div className="notification-list">
            {older[dateLabel].map((item) => (
              <NotificationCard key={item.notification_id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
