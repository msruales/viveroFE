import {
    configureStore,
    ThunkAction,
    Action,
    getDefaultMiddleware,
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {productApi} from "../services/productApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "../pages/Auth/service/authApi";
import authSlice from "./slices/authSlice";
import {categoryApi} from "../services/categoryApi";


export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {

            console.log('We got a rejected action!')
        }

        return next(action)
    }

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authSlice,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            rtkQueryErrorLogger,
            categoryApi.middleware,
            productApi.middleware,
            authApi.middleware
        )
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
