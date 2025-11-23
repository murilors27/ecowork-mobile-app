import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextStyle,
} from "react-native";
import { theme } from "../theme/theme";
import { EcoText } from "./EcoText";

interface Props {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  color?: string;
  icon?: React.ReactNode;
  style?: TextStyle;
}

export function EcoButton({
  title,
  loading,
  disabled = false,
  onPress,
  color = theme.colors.primary,
  icon,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, opacity: disabled || loading ? 0.7 : 1 },
        style
      ]}
      onPress={disabled || loading ? undefined : onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          {icon}
          <EcoText style={styles.text}>{title}</EcoText>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  text: {
    color: "#FFF",
  },
});
