import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../utils/axiosInstance.ts";
import { ProductGetAllDto, ProductGetAllQuery } from '../../../types/ProductTypes.ts';
import { exportProductsToExcel } from '../../../utils/excelHelper.ts';
import saveAs from 'file-saver';

interface ProductState {
  products: ProductGetAllDto[];
  isLoading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk<ProductGetAllDto[],ProductGetAllQuery>(
  'products/fetchProducts', 
  async (productGetAllQuery) => {
    try {
      const response = await api.post<ProductGetAllDto[]>('/Products/GetAll',productGetAllQuery);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
});

export const exportProducts = createAsyncThunk(
  'products/exportProducts',
  async (products: ProductGetAllDto[]) => {
    try {
      const excelData = await exportProductsToExcel(products);
      saveAs(excelData, 'products.xlsx');
      return products; // Return the products if the export is successful
    } catch (error) {
      throw new Error('Failed to export products');
    }
  }
);
  
const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.error = null;
        state.products = payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(exportProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(exportProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(exportProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to export products';
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;