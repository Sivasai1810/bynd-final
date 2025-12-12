export default function NotificationSkeleton() {
  return (
    <div className="notification-card skeleton">
      <div className="notification-left-bar skeleton-bar"></div>

      <div className="notification-content">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line long"></div>
      </div>
    </div>
  );
}
