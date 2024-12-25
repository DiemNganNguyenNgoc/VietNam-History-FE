import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/userSlide";
import questionReducer from "./slides/questionSlide";
import tagReducer from "./slides/tagSlide";
import answerReducer from './slides/AnswerSlice'; // Import answerSlice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    question: questionReducer,
    tag: tagReducer,
    answer: answerReducer,
  },
});
