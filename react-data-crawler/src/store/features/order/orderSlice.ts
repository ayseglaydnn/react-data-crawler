import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../utils/axiosInstance.ts";
import { OrderGetAllDto, OrderGetAllQuery } from '../../../types/OrderTypes.ts';


interface OrderState {
  orders: OrderGetAllDto[];
  selectedOrder: string | null;
  isLoading: boolean;
  error: string | null;
}

export const fetchOrders = createAsyncThunk<OrderGetAllDto[],OrderGetAllQuery>(
  'orders/fetchOrders', 
  async (orderGetAllQuery) => {
    try {
      const response = await api.post<OrderGetAllDto[]>('/Orders/GetAll',orderGetAllQuery);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
});

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (orderId: string) => {
    try {
      await api.delete(`/Orders/${orderId}`);
      return orderId;
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  }
);
  
const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    selectOrder: (state, {payload}) => {
      state.selectedOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = state.orders.filter((order) => order.id !== payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete order';
      });
  },
});

export const { selectOrder } = orderSlice.actions;

export default orderSlice.reducer;