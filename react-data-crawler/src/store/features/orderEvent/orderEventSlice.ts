import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../utils/axiosInstance.ts";
import { OrderEventGetAllDto, OrderEventGetAllQuery } from '../../../types/OrderEventTypes.ts';


interface OrderEventState {
  orderEvents: OrderEventGetAllDto[];
  isLoading: boolean;
  error: string | null;
}

export const fetchOrderEvents = createAsyncThunk<OrderEventGetAllDto[],OrderEventGetAllQuery>(
  'orderEvents/fetchOrderEvents', 
  async (orderEventGetAllQuery) => {
    try {
      const response = await api.post<OrderEventGetAllDto[]>('/OrderEvents/GetAll',orderEventGetAllQuery);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch order events');
    }
});
  
const initialState: OrderEventState = {
  orderEvents: [],
  isLoading: false,
  error: null,
};

const orderEventSlice = createSlice({
  name: 'orderEvents',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderEvents.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.error = null;
        state.orderEvents = payload;
      })
      .addCase(fetchOrderEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export const {} = orderEventSlice.actions;

export default orderEventSlice.reducer;