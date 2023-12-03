import { configureStore } from '@reduxjs/toolkit';
import { tasksSlice } from './taskSlice';
import { categoriesSlice } from './categoriesSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        categories: categoriesSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;