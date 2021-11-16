import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../components/App/appSlice';
import modalReducer from '../components/Modal/modalSlice';
import filterReducer from '../components/Filter/filterSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    modal: modalReducer,
    filter: filterReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
