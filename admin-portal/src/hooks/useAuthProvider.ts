import { useMemo } from "react";
import { useLocalStorage } from "react-use";

import { AuthProvider } from "react-admin";

import { useHttpClient } from "./useHttpClient";

export const useAuthProvider = () => {
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const { httpClient, baseUrl } = useHttpClient();
  const authProvider = useMemo<AuthProvider>(
    () => ({
      login: async (params) => {
        try {
          const response = await httpClient(`${baseUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify(params),
          });
          setAccessToken(response.json.access_token);
          return Promise.resolve();
        } catch {
          return Promise.reject();
        }
      },
      checkError: ({ status }) => {
        if (status === 401) {
          return Promise.reject();
        }
        return Promise.reject();
      },
      checkAuth: () => (accessToken ? Promise.resolve() : Promise.reject()),
      logout: async () => {
        try {
          return Promise.resolve();
        } catch {
          return Promise.reject();
        }
      },
      getIdentity: async () => {
        try {
          const response = await httpClient(`${baseUrl}/auth/profile`, {
            method: "GET",
          });
          return Promise.resolve({ id: response.json.id });
        } catch {
          return Promise.reject();
        }
      },
      getPermissions: async () => {
        return Promise.resolve();
      },
    }),
    [accessToken, setAccessToken, baseUrl, httpClient]
  );

  return { authProvider };
};
