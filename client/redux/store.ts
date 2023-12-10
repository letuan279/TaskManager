import { configureStore } from '@reduxjs/toolkit';
import { tasksSlice } from './taskSlice';
import { categoriesSlice } from './categoriesSlice';
import { userSlice } from './userSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        categories: categoriesSlice.reducer,
        user: userSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;