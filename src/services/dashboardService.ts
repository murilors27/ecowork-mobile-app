import { api } from "./api";

export async function getUserData() {
  const response = await api.get("/api/usuarios/me");
  return response.data;
}

export async function getRecentRegistros(usuarioId: number) {
  const response = await api.get(`/api/consumos/usuario/${usuarioId}`, {
    params: { pagina: 0, tamanho: 3 }
  });

  return response.data.content;
}

export async function getMetas(empresaId: number) {
  const response = await api.get(`/api/metas/empresa/${empresaId}`);
  return response.data;
}

export async function getDashboardData() {
  const user = await getUserData();

  const registrosRecentes = await getRecentRegistros(user.id);

  const metas = await getMetas(user.empresa.id);

  return {
    user,
    registrosRecentes,
    metas
  };
}
