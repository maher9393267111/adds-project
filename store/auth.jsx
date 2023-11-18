import { createSlice } from '@reduxjs/toolkit';
import themeConfig from '../theme.config';
import Cookies from 'js-cookie';

const initialState = {
    userInfo: Cookies.get('userdata') ? JSON.parse(Cookies.get('userdata')) : null,

    token: Cookies.get('token') ? JSON.parse(Cookies.get('token')) : null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUserData(state, { payload }) {
          

            state.userInfo = payload;
            state.token = payload.token;

         
        },

        Logout: (state) => {
            console.log('Logged out')
             state.userInfo = null;
             state.token = null;
            
            Cookies.set('isAuth', false);
            Cookies.remove('userdata');
            Cookies.remove('token');
        },
    },
});

export const { setUserData, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;
