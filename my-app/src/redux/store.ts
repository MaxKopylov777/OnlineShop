import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlise'
import productReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'



export const store = configureStore({
  reducer: {
    basketShop: basketReducer,
    items:productReducer,
    categories: categoriesReducer,
  },
})

export type AppDispach = typeof store.dispatch;
export type RootState = ReturnType <typeof store.getState>;