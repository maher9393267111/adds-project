import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import AuthSlice from './auth';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth : AuthSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
