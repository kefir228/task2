import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './slicers/cardSlice'
import modalReducer from './slicers/modalSlice'
import filtersReducer from './slicers/filterSlice'
import basketReducer from './slicers/basketSlice'
export const store = configureStore({
    reducer: {
        card: cardReducer,
        modal: modalReducer,
        filters: filtersReducer,
        basket: basketReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;