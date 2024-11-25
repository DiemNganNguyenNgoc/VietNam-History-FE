import HomePage from "../pages/HomePage/HomePage";
import QuestionPage from "../pages/QuestionPage/QuestionPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import TagsPage from "../pages/TagsPage/TagsPage";
import TagsDetailPage from "../pages/TagsDetailPage/TagsDetailPage";
import OtherUserProfilePage from "../pages/OtherUserProfilePage/OtherUserProfilePage";
import AskQuestionPage from "../pages/AskQuestionPage/AskQuestionPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },

  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: true,
  },

  {
    path: "/login",
    page: LogInPage,
    isShowHeader: true,
  },

  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },

  {
    path: "/question",
    page: QuestionPage,
    isShowHeader: true,
  },

  {
    path: "/tags",
    page: TagsPage,
    isShowHeader: true,
  },


  {
    path: "*",
    page: NotFoundPage,
  },

  {
    path: "/tagsdetail",
    page: TagsDetailPage,
    isShowHeader: true,
  },

  {
    path: "/otheruserprofile",
    page: OtherUserProfilePage,
    isShowHeader: true,
  },
  {
    path: '/askquestion',
    page: AskQuestionPage,
    isShowHeader: true
  },
];
