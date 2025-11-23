import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

export default function RegistrosScreen({ navigation }: any) {
  const { user } = useAuth();
  console.log("USER ATUAL NO REGISTROS ===>", user);

  const [registros, setRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarRegistros() {
    if (!user) return;

    try {
      setLoading(true);

      const response = await api.get(`/api/consumos/usuario/${user.id}`);

      setRegistros(response.data.content);
    } catch (error: any) {
      console.log("Erro ao carregar:", error.response?.data);
      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          "Não foi possível carregar os registros."
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
      "Confirmar exclusão",
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
    } catch (error: any) {
      console.log(error.response?.data);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Erro ao deletar registro."
      );
    }
  }

  function renderItem({ item }: any) {
    return (
      <View style={styles.card}>
        <Text style={styles.tipo}>{item.tipo}</Text>
        <Text style={styles.valor}>Valor: {item.valor}</Text>
        <Text>ID: {item.id}</Text>

        <View style={styles.cardButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditarRegistro", { id: item.id })
            }
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmarDelete(item.id)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registros</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#16a34a"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum registro encontrado.
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Registrar")}
      >
        <Text style={styles.addText}>+ Criar Novo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  tipo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  valor: {
    marginTop: 4,
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 6,
    width: "48%",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 8,
    borderRadius: 6,
    width: "48%",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
