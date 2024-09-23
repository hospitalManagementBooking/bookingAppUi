/* eslint-disable no-unused-vars */

import { configureStore } from "@reduxjs/toolkit";
import GetAllUserSlice from "../Slice/GetAllUserSlice"; // Ensure this path is correct

const store = configureStore({
    reducer: {
        GetAllUser: GetAllUserSlice, // Use the slice directly
    },
    devTools: true, // Optional: Enable Redux DevTools
});

export default store;