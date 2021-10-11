import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import recomendationsReducer from "../features/recomendationsSlice";
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    newsRecommend: recomendationsReducer,
  },
});
