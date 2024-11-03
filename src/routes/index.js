import HomePage from "../pages/HomePage/HomePage";
import QuestionPage from "../pages/QuestionPage/QuestionPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowMenu: true,
  },
  {
    path: "/signup",
    page: SignUpPage,
  },

  {
    path: "/login",
    page: LogInPage,
  },
  {
    path: '/question',
    page: QuestionPage,
    isShowHeader: true
},
  {
    path: "*",
    page: NotFoundPage,
  },
];
