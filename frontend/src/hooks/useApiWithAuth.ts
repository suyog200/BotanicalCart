import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { api } from "../api/api";

export const useApiWithAuth = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Cleanup interceptor on unmount
    return () => api.interceptors.request.eject(interceptor);
  }, [getToken]);
};