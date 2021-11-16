import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store/store';

export interface IRoom {
  id: string;
  title: string;
  photo: string;
  price: number;
  countRoom: number;
}

export interface AppState {
  rooms: IRoom[],
  loading: boolean,
  error: boolean
}

const initialState: AppState = {
  rooms: [],
  loading: false,
  error: false
}

export const fetchRooms = () => async (dispatch: Dispatch)  => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/rooms`)
    dispatch(getRoomsSuccess(data.results))
  } catch (error) {
    dispatch(getRoomsFailure())
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    getRooms: (state) => {
      state.loading = true
    },
    getRoomsSuccess: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = action.payload
      state.loading = false
      state.error = false
    },
    getRoomsFailure: state => {
      state.loading = false
      state.error = true
    },
  }
});

export const appState = (state: RootState) => state.app;

export const { getRooms, getRoomsSuccess, getRoomsFailure } = appSlice.actions

export default appSlice.reducer