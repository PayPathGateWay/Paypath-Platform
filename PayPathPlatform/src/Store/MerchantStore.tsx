import { configureStore } from '@reduxjs/toolkit';
import merchantPlatformReducer from "./MerchantSlice";

export const store = configureStore({
    reducer: {
        merchantPlatform: merchantPlatformReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
