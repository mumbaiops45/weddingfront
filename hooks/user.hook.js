'use client'; 

import { useUserStore } from "../store/user.store";

export const useUser = () => {
  const { user, token, loading, error, register, login, logout, refreshToken } = useUserStore();
  return { user, token, loading, error, register, login, logout, refreshToken };
};