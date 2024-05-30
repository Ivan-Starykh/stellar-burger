import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

// Типизация состояния заказа
type TOrderSliceState = {
  order: TOrder | null;
  orderIsLoading: boolean;
  error: string | undefined;
};

// Начальное состояние
const initialState: TOrderSliceState = {
  order: null,
  orderIsLoading: false,
  error: undefined
};

// Создание асинхронного thunk для размещения заказа
export const fetchOrderBurgerApi = createAsyncThunk(
  'postOrder/fetchOrderBurgerApi',
  async (data: string[]) => orderBurgerApi(data)
);

// Создание слайса для заказов
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderIsLoading = false;
    }
  },
  selectors: {
    selectOrderIsLoading: (state) => state.orderIsLoading,
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchOrderBurgerApi.rejected, (state, action) => {
        state.orderIsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.order = action.payload.order;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectOrderIsLoading, selectOrder } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
