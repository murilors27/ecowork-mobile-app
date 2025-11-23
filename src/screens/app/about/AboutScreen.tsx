import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { EcoText } from "../../../components/EcoText";
import { EcoCard } from "../../../components/EcoCard";
import { theme } from "../../../theme/theme";

const COMMIT_HASH = "abc1234";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EcoText type="title" style={styles.title}>
        Sobre o App
      </EcoText>

      <EcoCard
        icon={null}
        title="EcoWork Mobile"
        description="Aplicativo para acompanhamento de sustentabilidade corporativa, gamificação verde e assistente EcoAssist."
      />

      <EcoCard
        icon={null}
        title="Versão da Aplicação"
        description="Esta versão corresponde ao commit base da entrega final."
      >
        <EcoText type="subtitle" style={styles.hashLabel}>
          Commit:
        </EcoText>

        <EcoText type="body" style={styles.hashValue}>
          {COMMIT_HASH}
        </EcoText>
      </EcoCard>

      <EcoText type="body" style={styles.footerText}>
        Todo o código-fonte desta versão está publicado no repositório oficial
        do grupo, garantindo transparência e rastreabilidade.
      </EcoText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 80,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  hashLabel: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  hashValue: {
    fontWeight: "bold",
    marginTop: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  footerText: {
    opacity: 0.7,
    textAlign: "center",
    marginTop: theme.spacing.lg,
  },
});
