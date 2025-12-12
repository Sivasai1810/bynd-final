import React from 'react';
import './Notification.css';
import Notificationimg from "../../assets/mail 1.svg"

const NotificationEmptyState = () => {
  return (
    <div className="notification-empty-container">
      <div className="notification-empty-content">
        <div className="notification-empty-icon">
          <img 
            src={Notificationimg} 
            alt="No notifications" 
            className="plane-icon"
          />
        </div>
        <h2 className="notification-empty-title">No notifications yet</h2>
        <p className="notification-empty-description">
          You'll see updates here once your assignments get viewed or engaged with
        </p>
      </div>
    </div>
  );
};

export default NotificationEmptyState;

// import "./EmptyState.css";
// import NotificationImg from "../../assets/mail 1.svg";

// export default function NotificationEmptyState() {
//   return (
//     <div className="notification-empty-container">
//       <div className="notification-empty-content">
//         <img src={NotificationImg} alt="no notifications" className="plane-icon" />

//         <h2>No notifications yet</h2>
//         <p>
//           You'll see updates here once your assignments get viewed or engaged with.
//         </p>
//       </div>
//     </div>
//   );
// }
