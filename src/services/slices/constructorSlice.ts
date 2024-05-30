import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

// Функция для генерации уникального идентификатора
const generateId = () => self.crypto.randomUUID();

// Определение состояния слайса для конструктора бургера
type TBurgerConstructorSliceState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isIngredientsLoading: boolean;
  error: string | null;
};

// Начальное состояние слайса для конструктора бургера
const initialState: TBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isIngredientsLoading: false,
  error: null
};

// Создание слайса для конструктора бургера
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Добавление ингредиента в конструктор
    addIngredients: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else if (payload.type === 'main' || payload.type === 'sauce') {
          state.constructorItems.ingredients.push(payload);
        }
      },
      // Подготовка данных перед добавлением ингредиента
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: generateId() }
      })
    },
    // Перемещение ингредиента вверх
    ingredientsToUp: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];
      const neighbourIngredient =
        state.constructorItems.ingredients[payload - 1];
      state.constructorItems.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },
    // Перемещение ингредиента вниз
    ingredientsToDown: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];
      const neighbourIngredient =
        state.constructorItems.ingredients[payload + 1];
      state.constructorItems.ingredients.splice(
        payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },
    // Удаление ингредиента из конструктора
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== payload.id
        );
    },

    // Очистка конструктора бургера
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.isIngredientsLoading = false;
    }
  },
  // Селектор для получения данных конструктора бургера
  selectors: {
    selectConstructorBurger: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export const { selectConstructorBurger } = burgerConstructorSlice.selectors;
