import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'semantic-ui-react';
import { RootState } from '../store/store';

const NotificationPage: React.FC = () => {
  const showNotifications = true; 

  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  return (
    <div className={`notification-panel ${showNotifications ? '' : 'hidden'}`}>
      <List className="notification-list">
        {notifications.length === 0 ? (
          <List.Item className="empty-notification">No new notifications</List.Item>
        ) : (
          notifications.map((notification, index) => (
            <List.Item key={index} className="notification">
              {notification}
            </List.Item>
          ))
        )}
      </List>
    </div>
  );
};

export default NotificationPage;