import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { RootState } from '../store/store';
import { useNavigate } from "react-router-dom";

const NotificationButton: React.FC = () => {

  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
  const navigate = useNavigate();

  const handleToggleNotifications = () => {
    navigate('/notificationPage');
  };

  return (
    <Button className="notification-button" onClick={handleToggleNotifications}>
      <span className="notification-count">{unreadCount}</span>
      <i className="fas fa-bell"></i>
    </Button>
  );
};

export default NotificationButton;