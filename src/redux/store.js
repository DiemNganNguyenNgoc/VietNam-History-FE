import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/userSlide";
import questionReducer from "./slides/questionSlide";
import tagReducer from "./slides/tagSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    question: questionReducer,
    tag: tagReducer,
  },
});
