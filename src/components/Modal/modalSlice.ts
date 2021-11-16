import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { filterSlice } from '../Filter/filterSlice';

export interface ModalState {
  isVisible: boolean;
  option: string;
  reserveId: string;
}

const initialState: ModalState = {
  isVisible: false,
  option: '',
  reserveId: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleVisible: (state) => {
      state.isVisible = !state.isVisible
    },
    reservation: (state, action: PayloadAction<string>) => {
      state.isVisible = true;
      state.option = 'reserve'
      state.reserveId = action.payload;
    },
    filteringOn: (state) => {
      state.isVisible = true;
      state.option = 'filter'
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(filterSlice.actions.filtering, (state, action) => {
      state.isVisible = false;
    })
    .addCase(filterSlice.actions.resetFilter, (state) => {
      state.isVisible = false;
      state.option = '';
    })
  }
});

export const modalState = (state: RootState) => state.modal;

export const { toggleVisible, reservation, filteringOn } = modalSlice.actions;

export default modalSlice.reducer;