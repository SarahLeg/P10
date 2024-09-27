import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const initialState = {
  user: {},
  token: null,
  loading: false,
  error: null,
};

// Créer un slice pour l'utilisateur
const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null
      localStorage.clear();
      
    },
  },
  extraReducers: (builder) => {
  },
});

// Actions générées automatiquement par createSlice
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

// Sélecteurs pour récupérer l'utilisateur et le token depuis le state
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

// Action asynchrone pour effectuer la connexion
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post('/user/login', credentials);
    dispatch(loginSuccess({ user: response.data.body.user, token: response.data.body.token }));
    localStorage.setItem('token', response.data.body.token);
  } catch (error) {
    console.error('Error during login:', error.response); // Affichez l'erreur complète pour le diagnostic
    dispatch(loginFailure(error.response?.data?.message || 'Unknown error'));
  }
};

// Exporter le reducer
export default userSlice.reducer;