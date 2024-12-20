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
  access_token: "",
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
      state.access_token = "";
    },
  },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
