import React from "react";
import { Text, TextProps } from "react-native";
import { theme } from "../theme/theme";

type EcoTextType = "title" | "subtitle" | "body" | "label";

interface Props extends TextProps {
  type?: EcoTextType;
  children: React.ReactNode;
}

export function EcoText({ type = "body", style, children, ...rest }: Props) {
  return (
    <Text style={[theme.font[type], style]} {...rest}>
      {children}
    </Text>
  );
}