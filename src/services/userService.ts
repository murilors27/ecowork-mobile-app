import { api } from "./api";

export async function getRecentRegistros(usuarioId: number) {
  const resp = await api.get(`/api/consumos/usuario/${usuarioId}`, {
    params: { pagina: 0, tamanho: 3 },
  });

  return resp.data?.content ?? [];
}

export async function getMetas(empresaId: number) {
  const resp = await api.get(`/api/metas/empresa/${empresaId}`);
  return resp.data ?? [];
}
