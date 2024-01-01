import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/info";
const token = JSON.parse(localStorage.getItem("jwt"));
console.log(token);

/// create action ///
export const signup = createAsyncThunk(
  "createTask",
  async (data, { rejectWithValue }) => {
    try {
      // const header = {
      //   Authorization: Bearer,
      // };
      const response = await axios.post(`${URL}/auth/signup`, data);
      return response.data.user;
    } catch (error) {
      console.log(error.response.data.errors[0]);
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "loginUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, body);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "getusers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/auth/users?search=${data}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "taskDetials",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || [],
    searcheusers: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        console.log(payload);
        localStorage.setItem("user", JSON.stringify(payload.user));
        localStorage.setItem("jwt", JSON.stringify(payload.token));
        state.currentUser = payload.user;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(payload));
        state.currentUser = payload;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        // state.searcheusers = payload;
      });
  },
});

export default taskSlice.reducer;
