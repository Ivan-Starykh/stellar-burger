import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

// Типизация состояния для userOrders
type TFeedSliceState = {
  userOrders: TOrder[];
  userOrdersIsLoading: boolean;
  error: string | undefined;
};

// Начальное состояние
const initialState: TFeedSliceState = {
  userOrders: [],
  userOrdersIsLoading: false,
  error: undefined
};

// Асинхронный thunk для получения заказов пользователя
export const fetchUserOrdersApi = createAsyncThunk(
  'userOrders/fetchUserOrdersApi',
  getOrdersApi
);

// Слайс для userOrders
const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrdersIsLoading: (state) => state.userOrdersIsLoading,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersApi.pending, (state) => {
        state.userOrdersIsLoading = true;
      })
      .addCase(fetchUserOrdersApi.rejected, (state, action) => {
        state.userOrdersIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserOrdersApi.fulfilled, (state, action) => {
        state.userOrdersIsLoading = false;
        state.userOrders = action.payload;
      });
  }
});

// Экспорт селектора и редьюсера
export const { selectUserOrders } = userOrdersSlice.selectors;
export const userOrderReducer = userOrdersSlice.reducer;
