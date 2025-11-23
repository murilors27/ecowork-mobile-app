import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";

import { useAuth } from "../../../contexts/AuthContext";
import { getRankingGlobal } from "../../../services/rankingService";

import { EcoText } from "../../../components/EcoText";
import { EcoCard } from "../../../components/EcoCard";
import { theme } from "../../../theme/theme";
import { Feather } from "@expo/vector-icons";

export default function RankingScreen() {
  const { loading } = useAuth();

  const [ranking, setRanking] = useState<any[]>([]);
  const [loadingRank, setLoadingRank] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await getRankingGlobal();
        setRanking(lista);
      } catch (err: any) {
        Alert.alert(
          "Erro",
          err?.response?.data?.message ||
            "Não foi possível carregar o ranking global."
        );
      } finally {
        setLoadingRank(false);
      }
    }

    carregar();
  }, []);

  if (loading || loadingRank) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TÍTULO */}
      <EcoText
        type="title"
        style={{ textAlign: "center", marginBottom: theme.spacing.lg }}
      >
        🏆 Ranking Global
      </EcoText>

      {/* LISTA */}
      {ranking.length === 0 && (
        <EcoText type="body" style={{ textAlign: "center", marginTop: 20 }}>
          Nenhum participante no ranking ainda.
        </EcoText>
      )}

      {ranking.map((item) => {
        const icon =
          item.posicao === 1 ? (
            <Feather name="award" size={28} color={theme.colors.primary} />
          ) : item.posicao === 2 ? (
            <Feather name="award" size={28} color={theme.colors.textMuted} />
          ) : item.posicao === 3 ? (
            <Feather name="award" size={28} color={theme.colors.primaryDark} />
          ) : (
            <Feather name="user" size={26} color={theme.colors.textSecondary} />
          );

        return (
          <EcoCard
            key={item.usuarioId}
            icon={icon}
            title={item.nome}
            description={item.empresa}
          >
            {/* PONTOS À DIREITA */}
            <EcoText
              type="subtitle"
              style={{
                textAlign: "right",
                color: theme.colors.primary,
                fontWeight: "700",
              }}
            >
              {item.pontosTotais} pts
            </EcoText>
          </EcoCard>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
