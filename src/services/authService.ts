import { api } from "./api";

export async function loginRequest(email: string, senha: string) {
  const response = await api.post("/auth/login", { email, senha });
  return response.data;
}

export async function registerRequest(nome: string, email: string, senha: string, empresaId: number) {
  const response = await api.post("/auth/register", {
    nome,
    email,
    senha,
    empresaId
  });
  return response.data;
}