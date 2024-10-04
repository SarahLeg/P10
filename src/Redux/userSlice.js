import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},           // Contient les informations de l'utilisateur
  token: null,        // Token de l'utilisateur
  loading: false,     // Indicateur de chargement
  error: null,        // Gestion des erreurs
};

// Thunk pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  'userSlice/loginUser',
  async (userData) => {
    const { data } = await axios.post(
      'http://localhost:3001/api/v1/user/login',
      userData
    );
    return data.body;
  }
);

// Thunk pour obtenir les informations de l'utilisateur
export const getUser = createAsyncThunk(
  'userSlice/getUser',
  async (token) => {
    const { data } = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });
    return data.body; 
  }
);

// Thunk pour mettre à jour l'utilisateur
export const updateUser = createAsyncThunk(
  'userSlice/updateUser',
  async ({ username, token }) => {
    const { data } = await axios.put(
      'http://localhost:3001/api/v1/user/profile', 
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.body;
  }
);

// Créer un slice pour l'utilisateur
const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = {};
      state.token = null;
      localStorage.clear();
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Gestion du pending pour `getUser`
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;  // Indique que la requête est en cours
      state.error = null;    // Réinitialisation de l'erreur
    });

    // Gestion du fulfilled pour `getUser`
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;            // La requête est terminée
      state.user = action.payload;      // Mise à jour des informations de l'utilisateur
      state.error = null;    // Réinitialisation de l'erreur
    });

    // Gestion du rejected pour `getUser`
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;            // Arrête le chargement en cas d'erreur
      state.error = action.error.message;  // Stocke le message d'erreur
    });

    // Gestion du fulfilled pour `loginUser`
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;   // Stockage du token
      localStorage.setItem('token', action.payload.token);  // Stockage du token dans le localStorage
      state.error = null;  // Réinitialisation de l'erreur
      state.loading = false;  // Arrête le chargement
    });

    // Gestion du rejected pour `loginUser`
    builder.addCase(loginUser.rejected, (state, action) => {
      state.token = null;  // Supprime le token en cas d'erreur
      localStorage.clear();  // Supprime les données du localStorage
      state.error = action.error.message;  // Stocke le message d'erreur
      state.loading = false;  // Arrête le chargement
      console.log(state.error);  // Affiche l'erreur dans la console
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;