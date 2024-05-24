import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

// Типизация состояния заказа по номеру
type TOrderByNumberSliceState = {
  orders: TOrder[];
  orderIsLoading: boolean;
  error: string | undefined;
};

// Начальное состояние
const initialState: TOrderByNumberSliceState = {
  orders: [],
  orderIsLoading: false,
  error: undefined
};

// Создание асинхронного thunk для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'getOrderByNumber/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

// Создание слайса для заказов по номеру
const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersIsLoading: (state) => state.orderIsLoading,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderIsLoading = false;
        state.error = action.error.message;
        console.log(state.error);
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

// Экспорт селекторов и редьюсера
export const { selectOrdersIsLoading, selectOrders } =
  orderByNumberSlice.selectors;
export const orderNuNumberReducer = orderByNumberSlice.reducer;
