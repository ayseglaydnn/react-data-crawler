import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationsState {
  notifications: string[];
  unreadCount: number;
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.unshift(action.payload);
      state.unreadCount++;
    },
    markNotificationAsRead: (state) => {
      if (state.unreadCount > 0) {
        state.unreadCount--;
      }
    },
  },
});

export const { addNotification, markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;