import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { ingredientsReducer } from './slices/ingredientSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { orderNuNumberReducer } from './slices/orderInfoSlice';
import { userReducer } from './slices/userSlice';
import { userOrderReducer } from './slices/usersOrderSlice';

// Определение редьюсеров для каждого модуля
const rootReducer = combineReducers({
  auth: userReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer,
  userOrders: userOrderReducer,
  orderByNumber: orderNuNumberReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
