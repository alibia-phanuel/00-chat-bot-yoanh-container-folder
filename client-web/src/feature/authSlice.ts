import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
/**
 * Définition de l'interface représentant les données utilisateur après connexion.
 */
interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}
/**
 * Définition de l'interface pour les erreurs retournées par l'API.
 */
interface ErrorResponse {
  msg: string; // Message d'erreur renvoyé par l'API en cas de problème
}
/**
 * Définition de l'état initial du slice d'authentification.
 */
// Définition de l'état initial
type AuthState = {
  user: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
};
const initialState: AuthState = {
  user: null as User | null, // L'utilisateur est initialement null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * Action asynchrone permettant de connecter un utilisateur.
 * Cette fonction envoie une requête à l'API pour authentifier l'utilisateur.
 */
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (
    user: { email: string; password: string }, // Type du paramètre utilisateur
    thunkAPI
  ) => {
    try {
      // Envoi de la requête de connexion avec les informations de l'utilisateur
      const response = await axios.post<User>(
        "https://chat-boot-92e040193633.herokuapp.com/login",
        {
          email: user.email,
          password: user.password,
        }
      );

      // Retourne les données de l'utilisateur en cas de succès
      return response.data;
    } catch (error) {
      // Vérifie si l'erreur provient d'axios
      if (axios.isAxiosError(error)) {
        // Vérifie si l'API a retourné une réponse et récupère le message d'erreur
        const message =
          (error.response?.data as ErrorResponse)?.msg ||
          "Une erreur inconnue est survenue";
        return thunkAPI.rejectWithValue(message);
      }

      // En cas d'erreur inconnue, renvoyer un message générique
      return thunkAPI.rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);

/**
 * Action asynchrone pour récupérer les informations de l'utilisateur connecté.
 */
export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/getMe",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<User>(
        "https://chat-boot-92e040193633.herokuapp.com/me"
      );

      // Si la requête réussit, retourne les données de l'utilisateur
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        // Vérifie si l'API a retourné une réponse
        if (axiosError.response) {
          const message =
            (axiosError.response.data as ErrorResponse)?.msg ||
            "Une erreur inconnue est survenue";
          return thunkAPI.rejectWithValue(message);
        }
      }

      // En cas d'erreur de connexion ou autre erreur
      return thunkAPI.rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);
/**
 * Action asynchrone pour déconnecter l'utilisateur.
 */
export const LogOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/LogOut",
  async (_, thunkAPI) => {
    try {
      await axios.delete("https://chat-boot-92e040193633.herokuapp.com/logout");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { msg?: string })?.msg ||
          "Erreur lors de la déconnexion";
        return thunkAPI.rejectWithValue(message);
      }

      return thunkAPI.rejectWithValue("Une erreur inconnue s'est produite");
    }
  }
);
/**
 * Déclaration du slice d'authentification avec Redux Toolkit.
 * Ce slice contient le reducer et les actions associées à l'authentification.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(LogOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

/**
 * Exportation de l'action reset pour permettre sa gestion dans le store Redux.
 */
export const { reset } = authSlice.actions;

/**
 * Exportation du reducer pour l'utiliser dans le store Redux.
 */
export default authSlice.reducer;
