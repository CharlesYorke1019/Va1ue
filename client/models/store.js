import { createSlice, configureStore } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    email: '',
    loggedIn: false,
    token: '',
    latestUpdate: 'none',
    notifications: [],
  },
  reducers: {

    setUserInfoSuccessfulLogIn: (state, userData) => {
      
      state.email = userData.payload.user.email;
      state.token = userData.payload.token;
      state.loggedIn = true;

    },

    setNotifications: (state, notificationObj) => {

      const exists = state.notifications.some(item => JSON.stringify(item) === JSON.stringify(notificationObj));

      console.log(notificationObj);
      
      if (!exists) {
        state.notifications.push(notificationObj);
      }

    },

    setLatestUpdate: (state, value) => {

      state.latestUpdate = value;

    },

    getNotifications: (state) => {

      return state.notifications;

    },

    getEmail: (state) => {

      return state.email;

    }
    
  }
})

export const { setUserInfoSuccessfulLogIn, setNotifications, setLatestUpdate, getNotifications, getEmail } = user.actions

export const store = configureStore({
  reducer: user.reducer
})