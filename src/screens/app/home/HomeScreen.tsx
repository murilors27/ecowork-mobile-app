import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { EcoText } from "../../../components/EcoText";
import { EcoCard } from "../../../components/EcoCard";
import { EcoButton } from "../../../components/EcoButton";
import { theme } from "../../../theme/theme";
import { useAuth } from "../../../contexts/AuthContext";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { logout } = useAuth(); // <-- AQUI USAMOS O LOGOUT REAL

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
      >
        {/* TÍTULO */}
        <EcoText
          type="title"
          style={{
            color: theme.colors.primary,
            textAlign: "center",
            marginBottom: theme.spacing.sm,
          }}
        >
          EcoWork
        </EcoText>

        {/* SUBTÍTULO */}
        <EcoText
          type="body"
          style={{
            textAlign: "center",
            marginBottom: theme.spacing.xl,
            paddingHorizontal: theme.spacing.sm,
            color: theme.colors.textSecondary,
          }}
        >
          A EcoWork ajuda empresas e colaboradores a reduzirem seu impacto
          ambiental através de registros, metas, gamificação e dicas de
          sustentabilidade.
        </EcoText>

        {/* DASHBOARD */}
        <EcoCard
          onPress={() => navigation.navigate("Dashboard")}
          icon={
            <Feather
              name="bar-chart-2"
              size={26}
              color={theme.colors.primary}
            />
          }
          title="Dashboard"
          description="Veja pontos, registros recentes e progresso sustentável."
        />

        {/* REGISTROS */}
        <EcoCard
          onPress={() => navigation.navigate("Registros")}
          icon={
            <Feather name="clipboard" size={26} color={theme.colors.primary} />
          }
          title="Registros"
          description="Cadastre consumo de energia, papel ou transporte."
        />

        {/* RANKING */}
        <EcoCard
          onPress={() => navigation.navigate("Ranking")}
          icon={<Feather name="award" size={26} color={theme.colors.primary} />}
          title="Ranking"
          description="Compare seus pontos e suba na classificação."
        />

        {/* ECOASSIST */}
        <EcoCard
          onPress={() => navigation.navigate("EcoAssist")}
          icon={
            <Feather
              name="message-circle"
              size={26}
              color={theme.colors.primary}
            />
          }
          title="EcoAssist"
          description="Faça perguntas sobre sustentabilidade e receba dicas."
        />

        {/* LOGOUT (FUNCIONAL) */}
        <EcoButton
          title="Sair"
          color={theme.colors.danger}
          icon={<Feather name="log-out" size={20} color="#FFF" />}
          style={{ marginTop: theme.spacing.xl }}
          onPress={logout} // <-- AGORA SIM!
        />
      </ScrollView>
    </SafeAreaView>
  );
}
