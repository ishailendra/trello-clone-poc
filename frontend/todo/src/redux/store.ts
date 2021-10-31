import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoBlockSlice from "./todoBlockslice";

// import todoSectionSlice from "./todoSectionSlice";

const store = configureStore({
  reducer: {
    todoBlockReducer: todoBlockSlice.reducer,

    // todoSectionReducer: todoSectionSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
