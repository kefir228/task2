import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
    manufacturers: string[]
    types: string[]
    sortBy: string | null
}

const initialState: FiltersState = {
    manufacturers: [],
    types: [],
    sortBy: null,
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleManufacturer: (state, action: PayloadAction<string>) => {
            const index = state.manufacturers.indexOf(action.payload)
            if (index === -1) {
                state.manufacturers.push(action.payload)
            } else {
                state.manufacturers.splice(index, 1)
            }
        },
        toggleType: (state, action: PayloadAction<string>) => {
            const index = state.types.indexOf(action.payload)
            if (index === -1) {
                state.types.push(action.payload)
            } else {
                state.types.splice(index, 1)
            }
        },
        setSortBy: (state, action: PayloadAction<string | null>) => {
            state.sortBy = action.payload
        },
        resetFilters: (state) => {
            state.manufacturers = []
            state.types = []
            state.sortBy = null
        },
    },
})
export const {toggleManufacturer, toggleType, setSortBy, resetFilters} = filtersSlice.actions;
export default filtersSlice.reducer;