import { createSlice, configureStore } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    email: '',
    loggedIn: false,
    id: '',
    token: '',
    latestUpdate: 'none',
    notifications: [],
    booksActive: []
  },
  reducers: {

    setUserInfoSuccessfulLogIn: (state, userData) => {

      state.email = userData.payload.user.email;
      state.id = userData.payload.user.id;
      state.booksActive = userData.payload.user.booksActive
      state.token = userData.payload.token;
      state.loggedIn = true;

    },

    setUserInfoLogOut: (state) => {

      state.email = '';
      state.loggedIn = false;
      state.id = '';
      state.token = '',
      state.latestUpdate = 'none',
      state.notifications = [];
      state.booksActive = [];

    },

    setNotifications: (state, notificationObj) => {

      const exists = state.notifications.some(item => JSON.stringify(item) === JSON.stringify(notificationObj));
      
      if (!exists) {
        state.notifications.push(notificationObj);
      }

    },

    setLatestUpdate: (state, value) => {

      state.latestUpdate = value;

    },

    setBooksActive: (state, books) => {

      state.booksActive = books.payload;

    },

    getNotifications: (state) => {

      return state.notifications;

    },

    getEmail: (state) => {

      return state.email;

    }
    
  }
})

export const { setUserInfoSuccessfulLogIn, setNotifications, setLatestUpdate, getNotifications, getEmail, setBooksActive, setUserInfoLogOut } = user.actions

export const store = configureStore({
  reducer: user.reducer
})