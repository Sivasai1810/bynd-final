export default function NotificationCard({ item }) {
  const istTime = new Date(item.last_viewed_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="notification-card">
      <div className="notification-left-bar"></div>

      <div className="notification-content">
        <p className="notification-message">
          <strong>{item.company_name}</strong> viewed your assignment for{" "}
          <strong>{item.position_name}</strong>
        </p>

        <p className="notification-time">{istTime}</p>
      </div>
    </div>
  );
}

