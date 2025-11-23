import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { api } from "../../../services/api";

export default function EcoassistScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function perguntarIA() {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const response = await api.get("/api/ai/perguntar", {
        params: { q: question },
      });

      setAnswer(response.data);
    } catch (e) {
      console.log(e);
      setAnswer("Erro ao obter resposta da IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoAssist 🌱</Text>
      <Text style={styles.subtitle}>
        Pergunte algo sobre sustentabilidade, consumo consciente, economia de
        energia, carbono… e receba uma dica personalizada!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Como posso economizar energia no escritório?"
        value={question}
        onChangeText={setQuestion}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={perguntarIA}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Perguntar</Text>
        )}
      </TouchableOpacity>

      <ScrollView style={styles.answerBox}>
        {!!answer && <Text style={styles.answer}>{answer}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  answerBox: {
    marginTop: 20,
    padding: 10,
  },
  answer: {
    fontSize: 16,
    lineHeight: 22,
  },
});
