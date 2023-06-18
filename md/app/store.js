import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counter-slice';
import headerReducer from "../layouts/Navbar/header-slice";

export const store = configureStore({
    reducer: {
        // state.counter   --> it will hold the value
        counter: counterReducer,
        header: headerReducer,
    },
    //devTools: false,
});
