import HomePage from "../pages/HomePage/HomePage";
import QuestionPage from "../pages/PostPage/PostPage";
import SearchQuestionPage from "../pages/SearchPostPage/SearchPostPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import TagsPage from "../pages/TagsPage/TagsPage";
import TagsDetailPage from "../pages/TagsDetailPage/TagsDetailPage";
import OtherUserProfilePage from "../pages/OtherUserProfilePage/OtherUserProfilePage";
import StatisticPage from "../pages/StatisticPage/StatisticPage";
import StatisticQuestionPage from "../pages/StatisticPage/StatisticPostPage";
import StatisticUserPage from "../pages/StatisticPage/StatisticUserPage";
import StatisticTopicPage from "../pages/StatisticPage/StatisticTopicPage";
import StatisticActivityPage from "../pages/StatisticPage/StatisticActivityPage";
import AskQuestionPage from "../pages/AskQuestionPage/AddPostPage";
import ProfileAdmin from "../AdminPage/ProfileAdmin/Profile_Admin";
import QuestionAdmin from "../AdminPage/PostAdmin/PostAdmin";
import UsersAdmin from "../AdminPage/UsersAdmin/UsersAdmin";
import QuestionDetailPage from "../pages/PostDetailPage/PostDetailPage";
import QuestionDetailAdmin from "../AdminPage/PostDetailAdmin/PostDetailAdmin";
import TagAdmin from "../AdminPage/TagAdmin/TagAdmin";
import ManageSystem from "../AdminPage/ProfileAdmin/ManageSystem";
import OtherListUserPage from "../pages/OrtherListUserPage/OtherListUserPage";
import UpdateQuestionPage from "../pages/UpdateQuestionPage/UpdatePostPage";
import SignUpAdminPage from "../AdminPage/ProfileAdmin/SignUpAdminPage";
import SavedPage from "../pages/SavedPage/SavedPage";

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
    path: "/search-results",
    page: SearchQuestionPage,
    isShowHeader: true,
  },

  {
    path: "/tag",
    page: TagsPage,
    isShowHeader: true,
  },

  {
    path: "/statistic",
    page: StatisticPage,
    isShowHeader: true,
  },

  {
    path: "admin/manage/statistic/question",
    page: StatisticQuestionPage,
    isShowHeader: true,
  },

  {
    path: "admin/manage/statistic/user",
    page: StatisticUserPage,
    isShowHeader: true,
  },

  {
    path: "admin/manage/statistic/topic",
    page: StatisticTopicPage,
    isShowHeader: true,
  },

  {
    path: "admin/manage/statistic/activity",
    page: StatisticActivityPage,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },

  {
    path: "/tagsdetail/:tagId",
    page: TagsDetailPage,
    isShowHeader: true,
  },

  {
    path: "/otheruserprofile/:userId",
    page: OtherUserProfilePage,
    isShowHeader: true,
  },
  {
    path: "/askquestion",
    page: AskQuestionPage,
    isShowHeader: true,
  },

  {
    path: "/update-question/:id",
    page: UpdateQuestionPage,
    isShowHeader: true,
  },

  {
    path: "/admin/profile",
    page: ProfileAdmin,
    isShowHeader: true,
  },

  {
    path: "/admin/add-admin",
    page: SignUpAdminPage,
    isShowHeader: true,
  },

  {
    path: "admin/question",
    page: QuestionAdmin,
    isShowHeader: true,
  },

  {
    path: "admin/user",
    page: UsersAdmin,
    isShowHeader: true,
  },

  {
    path: "/question-detail/:questionId",
    page: QuestionDetailPage,
    isShowHeader: true,
  },

  {
    path: "/admin/question-detail/:questionId",
    page: QuestionDetailAdmin,
    isShowHeader: true,
  },
  {
    path: "/admin/tag",
    page: TagAdmin,
    isShowHeader: true,
  },

  {
    path: "/admin/manage",
    page: ManageSystem,
    isShowHeader: true,
  },

  {
    path: "/other-list-user",
    page: OtherListUserPage,
    isShowHeader: true,
  },

  {
    path: "/saved-list",
    page: SavedPage,
    isShowHeader: true,
  },


];
