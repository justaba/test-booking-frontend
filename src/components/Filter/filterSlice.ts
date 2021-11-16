import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface FilterState {
  filterOn: boolean;
  rangeRoom: [number, number];
  minPrice: number;
  maxPrice: number;
}

const initialState: FilterState = {
  filterOn: false,
  rangeRoom: [1, 5],
  minPrice: 0,
  maxPrice: 99999
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filtering: (state, action: PayloadAction<FilterState>) => {
      state.filterOn = action.payload.filterOn;
      state.rangeRoom = action.payload.rangeRoom;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    resetFilter: (state) => {
      state.filterOn = false;
      state.rangeRoom = [1, 5];
      state.minPrice = 0;
      state.maxPrice = 99999;
    }
  }
});

export const filterState = (state: RootState) => state.filter;

export const { filtering, resetFilter } = filterSlice.actions

export default filterSlice.reducer