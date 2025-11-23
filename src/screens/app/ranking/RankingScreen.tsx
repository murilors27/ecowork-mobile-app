import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { getRankingGlobal } from "../../../services/rankingService";

export default function RankingScreen() {
  const { user, loading } = useAuth();
  const [ranking, setRanking] = useState<any[]>([]);
  const [loadingRank, setLoadingRank] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await getRankingGlobal();
        setRanking(lista);
      } catch (e: any) {
        console.log("Erro ao carregar ranking:", e?.response?.data);
      } finally {
        setLoadingRank(false);
      }
    }

    if (user) carregar();
  }, [user]);

  if (loading || loadingRank) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🏆 Ranking Global</Text>

      {ranking.map((item, index) => {
        const medalha =
          item.posicao === 1
            ? "🥇"
            : item.posicao === 2
            ? "🥈"
            : item.posicao === 3
            ? "🥉"
            : `#${item.posicao}`;

        return (
          <View key={item.usuarioId} style={styles.card}>
            <Text style={styles.posicao}>{medalha}</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.empresa}>{item.empresa}</Text>
            </View>

            <Text style={styles.pontos}>{item.pontosTotais} pts</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    elevation: 2,
  },
  posicao: {
    fontSize: 28,
    width: 50,
    textAlign: "center",
  },
  nome: {
    fontWeight: "600",
    fontSize: 16,
  },
  empresa: {
    fontSize: 13,
    color: "#6b7280",
  },
  pontos: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
  },
});