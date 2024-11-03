import HomePage from "../pages/HomePage/HomePage";
import QuestionPage from "../pages/QuestionPage/QuestionPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export const routes = [
  {
    path: "/homepage",
    page: HomePage,
    isShowHeader: true,
  },

  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: true
  },

  {
    path: "/login",
    page: LogInPage,
    isShowHeader: true
  },

  {
    path: "/profilepage",
    page: ProfilePage,
    isShowHeader: true,
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
