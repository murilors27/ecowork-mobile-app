import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { getRecentRegistros, getMetas } from "../../../services/userService";

export default function DashboardScreen() {
  const { user, loading } = useAuth();

  const [recentes, setRecentes] = useState<any[]>([]);
  const [metas, setMetas] = useState<any[]>([]);
  const [loadingDash, setLoadingDash] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function carregar() {
      try {
        const r = await getRecentRegistros(user.id);
        const m = user.empresa ? await getMetas(user.empresa.id) : [];

        setRecentes(r ?? []);
        setMetas(m ?? []);
      } catch (err: any) {
        console.log("Erro ao carregar dashboard:", err?.response?.data);
      } finally {
        setLoadingDash(false);
      }
    }

    carregar();
  }, [user]);

  if (loading || loadingDash || !user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#f3f4f6",
        minHeight: "100%",
      }}
    >

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#14532d",
          marginBottom: 6,
        }}
      >
        Bem-vindo, {user.nome}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20, color: "#374151" }}>
        Empresa: {user.empresa?.nome ?? "Não informado"}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 10,
          color: "#166534",
        }}
      >
        Registros Recentes
      </Text>

      {recentes.length === 0 && (
        <Text style={{ color: "#555" }}>Nenhum registro ainda.</Text>
      )}

      {recentes.map((reg) => (
        <View
          key={reg.id}
          style={{
            backgroundColor: "#dcfce7",
            padding: 15,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#065f46" }}>
            Tipo: {reg.tipo}
          </Text>
          <Text style={{ color: "#065f46" }}>Valor: {reg.valor}</Text>
        </View>
      ))}

      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 10,
          color: "#1e3a8a",
        }}
      >
        Metas da Empresa
      </Text>

      {metas.length === 0 && (
        <Text style={{ color: "#555" }}>Nenhuma meta encontrada.</Text>
      )}

      {metas.map((meta) => (
        <View
          key={meta.id}
          style={{
            backgroundColor: "#dbeafe",
            padding: 15,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#1e40af" }}>
            {meta.nome}
          </Text>
          <Text style={{ color: "#1e40af" }}>Status: {meta.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}