"use client"

import { create } from "zustand";
import * as userService from "../service/user.service";
import { refreshToken } from "../api/lead.api";

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await userService.registerUserService(data);
    //   set({ user: res.user, token: res.token, loading: false });
    set({ user: res.user, token: res.accessToken, loading: false });
      return res;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

 login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await userService.loginUserService(data);
      set({ user: res.user, token: res.accessToken, loading: false });
      return res;
    } catch (error) {
      console.log("Login error response:", error.response?.data); // ✅ add this
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  refreshToken: async () => {
    try {
       const res = await userService.refreshTokenService();
       set({token: res.accessToken});
       return res;
    } catch (error) {
        set({user: null, token: null});
         console.error("Session expired. Please login again.");
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await userService.logoutUserService();
      set({ user: null, token: null, loading: false });
        window.location.href = "/login";
    } catch (error) {
      set({ user: null, token: null, loading: false }); 
      window.location.href = "/login";
    }
  },

  refreshToken: async () => {
    try {
      const res = await userService.refreshTokenService();
      set({ token: res.token });
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  }
}));