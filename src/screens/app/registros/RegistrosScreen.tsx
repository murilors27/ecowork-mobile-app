import React, { useCallback, useState } from "react";
import { View, ActivityIndicator, FlatList, Alert, StyleSheet } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "../../../services/api";

import { EcoText } from "../../../components/EcoText";
import { EcoCard } from "../../../components/EcoCard";
import { EcoButton } from "../../../components/EcoButton";
import { theme } from "../../../theme/theme";

import { Feather } from "@expo/vector-icons";

export default function RegistrosScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [registros, setRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarRegistros() {
    if (!user) return;

    try {
      setLoading(true);

      const resp = await api.get(`/api/consumos/usuario/${user.id}`);
      setRegistros(resp.data?.content ?? []);
    } catch (err: any) {
      console.log("Erro ao carregar:", err?.response?.data);
      Alert.alert(
        "Erro",
        err?.response?.data?.message || "Não foi possível carregar os registros."
      );
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarRegistros();
    }, [user?.id])
  );

  function confirmarDelete(id: number) {
    Alert.alert(
      "Excluir registro",
      "Deseja realmente excluir este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deletar(id),
        },
      ]
    );
  }

  async function deletar(id: number) {
    try {
      await api.delete(`/api/consumos/${id}`);
      Alert.alert("Sucesso", "Registro excluído!");
      carregarRegistros();
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err?.response?.data?.message || "Erro ao excluir registro."
      );
    }
  }

  function renderItem({ item }: any) {
    return (
      <EcoCard
        icon={<Feather name="file-text" size={24} color={theme.colors.primary} />}
        title={`Tipo: ${item.tipo}`}
        description={`Valor: ${item.valor}`}
        onPress={() =>
          navigation.navigate("EditarRegistro", { id: item.id })
        }
      >
        {/* Botões dentro do card */}
        <View style={styles.row}>
          <EcoButton
            title="Editar"
            color={theme.colors.primary}
            icon={<Feather name="edit" size={18} color="#FFF" />}
            onPress={() =>
              navigation.navigate("EditarRegistro", { id: item.id })
            }
          />

          <EcoButton
            title="Excluir"
            color={theme.colors.danger}
            icon={<Feather name="trash" size={18} color="#FFF" />}
            onPress={() => confirmarDelete(item.id)}
          />
        </View>
      </EcoCard>
    );
  }

  return (
    <View style={styles.container}>
      <EcoText type="title" style={styles.title}>
        Registros
      </EcoText>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <EcoText type="body" style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum registro encontrado.
            </EcoText>
          }
        />
      )}

      {/* Botão flutuante */}
      <EcoButton
        title="Criar Novo"
        color={theme.colors.primary}
        icon={<Feather name="plus" size={20} color="#FFF" />}
        style={styles.fab}
        onPress={() => navigation.navigate("Registrar")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});