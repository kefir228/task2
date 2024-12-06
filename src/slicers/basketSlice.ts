import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "./cardSlice";

interface BasketState {
    isOpen: boolean
    items: Card[]
}

const initialState: BasketState = {
    isOpen: false,
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        openBasket: (state) => {
            state.isOpen = true
        },
        closeBasket: (state) => {
            state.isOpen = false
        },
        addToBasket: (state, action: PayloadAction<Card>) => {
            state.items.push(action.payload)
            
        },
        resetBasket: (state) => {
            state.items = []
        }
    }
})

export const { openBasket, closeBasket, addToBasket, resetBasket } = basketSlice.actions
export default basketSlice.reducer