import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";

import { EcoText } from "../../../components/EcoText";
import { EcoButton } from "../../../components/EcoButton";
import { EcoCard } from "../../../components/EcoCard";

import { api } from "../../../services/api";
import { theme } from "../../../theme/theme";

export default function EcoassistScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function perguntarIA() {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer("");

      const resp = await api.get("/api/ai/perguntar", {
        params: { q: question },
      });

      setAnswer(resp.data);
    } catch (e) {
      console.log(e);
      setAnswer("Erro ao obter resposta da IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <EcoText type="title" style={styles.title}>
        EcoAssist 🌱
      </EcoText>

      <EcoText type="body" style={styles.subtitle}>
        Pergunte algo sobre sustentabilidade, consumo consciente, economia de
        energia e receba uma dica personalizada.
      </EcoText>

      <TextInput
        style={styles.input}
        placeholder="Ex: Como posso economizar energia no escritório?"
        placeholderTextColor={theme.colors.textMuted}
        value={question}
        onChangeText={setQuestion}
      />

      <EcoButton
        title="Perguntar"
        onPress={perguntarIA}
        disabled={loading}
        style={{ marginTop: theme.spacing.sm }}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: theme.spacing.lg }}
        />
      )}

      {!!answer && (
        <EcoCard title="Resposta da IA" description={answer} icon={undefined} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 40,
  },
  title: {
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    opacity: 0.8,
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    fontSize: 16,
  },
});
