import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  function entrar() {
    navigation.replace("AppTabs");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>EcoWork</Text>

      <Text style={styles.desc}>
        A EcoWork ajuda empresas e colaboradores a reduzirem o impacto
        ambiental através de registros, metas sustentáveis, gamificação e uma
        assistente inteligente de sustentabilidade.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Dashboard</Text>
        <Text style={styles.cardDesc}>
          Veja seus pontos, registros recentes e progresso sustentável.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 Registros</Text>
        <Text style={styles.cardDesc}>
          Registre consumo de papel, energia ou transporte.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏆 Ranking</Text>
        <Text style={styles.cardDesc}>
          Compare seus pontos com colegas e suba na classificação.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 EcoAssist</Text>
        <Text style={styles.cardDesc}>
          Tire dúvidas sobre como ser mais sustentável no dia a dia.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#16a34a",
  },
  subtitle: {
    fontSize: 18,
    color: "#374151",
    marginTop: 4,
    marginBottom: 20,
  },
  desc: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ecfdf5",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1fae5",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#065f46",
  },
  cardDesc: {
    fontSize: 15,
    color: "#047857",
    marginTop: 4,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});