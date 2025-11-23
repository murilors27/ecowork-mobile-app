import { api } from "./api";

export async function getRankingGlobal() {
  const resp = await api.get("/api/ranking/global");
  return resp.data ?? [];
}

export async function getRankingEmpresa(empresaId: number) {
  const resp = await api.get(`/api/ranking/empresa/${empresaId}`);
  return resp.data ?? [];
}

export async function getMinhaPosicao() {
  const resp = await api.get(`/api/ranking/me`);
  return resp.data;
}