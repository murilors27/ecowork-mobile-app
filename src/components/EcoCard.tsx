import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { EcoText } from "./EcoText";
import { theme } from "../theme/theme";

type Props = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
  children?: React.ReactNode;
};

export function EcoCard({ icon, title, description, onPress, children }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      {icon && <View style={styles.icon}>{icon}</View>}

      <EcoText type="subtitle" style={styles.title}>
        {title}
      </EcoText>

      <EcoText type="body" style={styles.description}>
        {description}
      </EcoText>

      {children && <View style={styles.children}>{children}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  icon: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    opacity: 0.8,
  },
  children: {
    marginTop: theme.spacing.md,
  },
});