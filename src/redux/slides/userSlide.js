import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  birthday: "",
  img: "",
  note: "",
  facebookLink: "",
  githubLink: "",
  address: "",
  gender: "",
  password: "",
  followerCount: 0,
  followingCount: 0,

  access_token: "",
  allUser: [], // Danh sách tất cả các user
  detailUser: {},
  allUsersExceptSelf: [], // Danh sách tất cả user trừ user hiện tại
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        name = "",
        email = "",
        phone = "",
        birthday = "",
        img = "",
        note = "",
        facebookLink = "",
        githubLink = "",
        address = "",
        gender = "",
        password = "",
        followerCount = 0,
        followingCount = 0,
        access_token,
      } = action.payload;

      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.birthday = birthday;
      state.img = img;
      state.note = note;
      state.facebookLink = facebookLink;
      state.githubLink = githubLink;
      state.address = address;
      state.gender = gender;
      state.password = password;
      state.followingCount = followingCount;
      state.followerCount = followerCount;
      state.access_token = access_token;
      state.id = _id;
    },
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.birthday = "";
      state.img = "";
      state.note = "";
      state.facebookLink = "";
      state.githubLink = "";
      state.address = "";
      state.gender = "";
      state.password = "";
      state.followerCount = 0;
      state.followingCount = 0;
      state.access_token = "";
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload; // Lưu danh sách Question từ API
    },
    setDetailUser: (state, action) => {
      state.detailUser = action.payload;
    },
    setAllUsersExceptSelf: (state, action) => {
      state.allUsersExceptSelf = action.payload;
    },
  },
});

export const {
  updateUser,
  resetUser,
  setDetailUser,
  setAllUser,
  setAllUsersExceptSelf,
} = userSlide.actions;

export default userSlide.reducer;
