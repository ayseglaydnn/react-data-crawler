import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/order/orderSlice';
import productReDucer from './features/product/productSlice';
import orderEventReducer from './features/orderEvent/orderEventSlice';
import crawlerLiveReducer from './features/crawlerLive/crawlerLiveSlice';
import notificationReducer from './features/notification/notificationSlice';


const store = configureStore({
  reducer: {
    orders: orderReducer,
    products:productReDucer,
    orderEvents:orderEventReducer,
    crawlerLive: crawlerLiveReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;