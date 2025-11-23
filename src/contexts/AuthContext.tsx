import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";
import { loginRequest, registerRequest } from "../services/authService";
import { UserData } from "../types/User";

interface AuthContextData {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (
    nome: string,
    email: string,
    senha: string,
    empresaId: number
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function saveSession(token: string) {
    setToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("@token", token);

    const respUser = await api.get("/api/usuarios/me");
    setUser(respUser.data);
    await AsyncStorage.setItem("@user", JSON.stringify(respUser.data));
  }

  useEffect(() => {
    async function loadSession() {
      try {
        const storedToken = await AsyncStorage.getItem("@token");

        if (!storedToken) {
          setLoading(false);
          return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

        const respUser = await api.get("/api/usuarios/me");

        setUser(respUser.data);
        setToken(storedToken);
      } catch (err) {
        console.log("Token inválido, limpando sessão.");
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@user");
        setUser(null);
        setToken(null);
      }

      setLoading(false);
    }

    loadSession();
  }, []);

  async function login(email: string, senha: string) {
    const resp = await loginRequest(email, senha);
    await saveSession(resp.token);
    console.log("LOGIN OK", resp.token);
  }

  async function register(
    nome: string,
    email: string,
    senha: string,
    empresaId: number
  ) {
    const resp = await registerRequest(nome, email, senha, empresaId);
    await saveSession(resp.token);
    console.log("REGISTER OK", resp.token);
  }

  async function logout() {
    setUser(null);
    setToken(null);

    delete api.defaults.headers.common["Authorization"];

    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
