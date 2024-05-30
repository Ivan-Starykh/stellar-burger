import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

// Типизация состояния ингредиентов
interface IIngredientSliceState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | undefined;
}

// Начальное состояние
const initialState: IIngredientSliceState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: undefined
};

// Селектор для фильтрации ингредиентов по типу
export const selectIngredientsByType = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) =>
      ingredients ? ingredients.filter((item) => item.type === type) : []
  );

// Создание асинхронного thunk для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

// Создание слайса для ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients: (state) => {
      state.isIngredientsLoading = false;
    },
    getIngredientsAdded: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(action.payload);
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
