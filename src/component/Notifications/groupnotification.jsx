export default function groupNotifications(notifications) {
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000); // 24hrs back

  const todayStr = today.toDateString();
  const yesterdayStr = yesterday.toDateString();

  const groups = {
    today: [],
    yesterday: [],
    older: {} // { "Dec 5, 2025": [..notifications] }
  };

  notifications.forEach((n) => {
    const d = new Date(n.last_viewed_at);
    const dStr = d.toDateString();

    if (dStr === todayStr) {
      groups.today.push(n);
    } else if (dStr === yesterdayStr) {
      groups.yesterday.push(n);
    } else {
      const formatted = d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (!groups.older[formatted]) {
        groups.older[formatted] = [];
      }
      groups.older[formatted].push(n);
    }
  });

  return groups;
}
