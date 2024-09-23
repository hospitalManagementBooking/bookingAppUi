// src/Slice/GetAllUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../API/api';

// Define initial state
const initialState = {
    users: [],
    loading: false,
    error: null,
};


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await api.get('hospital/getAllHospitals'); 
    return response.data; 
});

// Create a slice
const GetAllUserSlice = createSlice({
    name: 'GetAllUser',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions
export const { addUser, removeUser } = GetAllUserSlice.actions;

// Export the reducer
export default GetAllUserSlice.reducer; // Export the reducer as default