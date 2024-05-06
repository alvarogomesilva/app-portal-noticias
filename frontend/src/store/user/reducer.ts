
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  currentUser: object;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  currentUser: {}
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = {}
    },

    setIsAutenticated(state) {
      state.isAuthenticated = true
    },

    setUser(state, action) {
      state.currentUser = action.payload
    }
  },
});

export const { setToken, clearToken, setIsAutenticated, setUser } = authSlice.actions;
export default authSlice.reducer;
