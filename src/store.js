import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {appSlice} from './slices';
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        navApp: appSlice,
    }
}, applyMiddleware(thunk))