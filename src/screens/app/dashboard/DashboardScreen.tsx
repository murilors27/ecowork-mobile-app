import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { getRecentRegistros, getMetas } from "../../../services/userService";

import { EcoText } from "../../../components/EcoText";
import { EcoCard } from "../../../components/EcoCard";
import { theme } from "../../../theme/theme";

import Feather from "@expo/vector-icons/Feather";

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
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TÍTULO */}
      <EcoText type="title" style={styles.title}>
        Bem-vindo, {user.nome}
      </EcoText>

      <EcoText type="body" style={styles.empresa}>
        Empresa: {user.empresa?.nome ?? "Não informado"}
      </EcoText>

      {/* REGISTROS RECENTES */}
      <EcoText type="subtitle" style={styles.sectionTitle}>
        Registros Recentes
      </EcoText>

      {recentes.length === 0 && (
        <EcoText type="body" style={styles.empty}>
          Nenhum registro ainda.
        </EcoText>
      )}

      {recentes.map((reg) => (
        <EcoCard
          key={reg.id}
          icon={
            <Feather name="activity" size={22} color={theme.colors.primary} />
          }
          title={`Tipo: ${reg.tipo}`}
          description={`Valor: ${reg.valor}`}
          onPress={() => {}}
        />
      ))}

      {/* METAS */}
      <EcoText type="subtitle" style={styles.sectionTitle}>
        Metas da Empresa
      </EcoText>

      {metas.length === 0 && (
        <EcoText type="body" style={styles.empty}>
          Nenhuma meta encontrada.
        </EcoText>
      )}

      {metas.map((meta) => (
        <EcoCard
          key={meta.id}
          icon={<Feather name="flag" size={22} color={theme.colors.primary} />}
          title={meta.nome}
          description={`Status: ${meta.status}`}
          onPress={() => {}}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },

  title: {
    textAlign: "left",
    marginBottom: theme.spacing.xs,
  },

  empresa: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
  },

  sectionTitle: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.primaryDark,
  },

  empty: {
    marginBottom: theme.spacing.md,
    color: theme.colors.textMuted,
  },
});
