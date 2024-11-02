import HomePage from "../pages/HomePage/HomePage";
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
    path: "*",
    page: NotFoundPage,
  },
];
