import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const LABELS_BY_TIPO: Record<string, string> = {
  ENERGIA: "Consumo em kWh",
  PAPEL: "Quantidade de folhas",
  TRANSPORTE: "Km percorridos",
};

export default function EditarRegistroScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { user } = useAuth();

  const [tipo, setTipo] = useState<string>("ENERGIA");
  const [valor, setValor] = useState<string>("");
  const [sensorId, setSensorId] = useState<number>(0);

  const [sensores, setSensores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function carregarRegistro() {
    try {
      const response = await api.get(`/api/consumos/${id}`);
      const reg = response.data;

      setTipo(reg.tipo);
      setValor(String(reg.valor));
      setSensorId(reg.sensor?.id ?? 0);
    } catch (e: any) {
      console.log("ERRO AO CARREGAR REGISTRO:", e.response?.data);
      Alert.alert("Erro", "Não foi possível carregar o registro.");
      navigation.goBack();
    }
  }

  async function carregarSensores() {
    try {
      const response = await api.get("/api/sensores");
      setSensores(response.data);

      if (response.data.length > 0 && sensorId === 0) {
        setSensorId(response.data[0].id);
      }
    } catch (e: any) {
      console.log(e.response?.data);
      Alert.alert("Erro", "Não foi possível carregar os sensores.");
    }
  }

  useEffect(() => {
    async function init() {
      await carregarSensores();
      await carregarRegistro();
      setLoading(false);
    }
    init();
  }, []);

  function parseValor(raw: string): number {
    const normalizado = raw.replace(",", ".").trim();
    return parseFloat(normalizado);
  }

  async function atualizar() {
    if (!user) return;

    if (!valor || !sensorId) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }

    const numero = parseValor(valor);

    if (isNaN(numero) || numero <= 0) {
      return Alert.alert("Atenção", "Informe um valor numérico válido maior que zero.");
    }

    try {
      setSaving(true);

      const payload = {
        tipo,
        valor: numero,
        usuarioId: user.id,
        sensorId,
        metaId: null,
      };

      console.log("PAYLOAD ATUALIZAR ===>", payload);

      await api.put(`/api/consumos/${id}`, payload);

      Alert.alert("Sucesso", "Registro atualizado com sucesso!");
      navigation.goBack();
    } catch (e: any) {
      console.log("ERRO AO ATUALIZAR:", e.response?.data);
      Alert.alert(
        "Erro",
        e.response?.data?.message || "Não foi possível atualizar o registro."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Editar Registro</Text>

          <Text style={styles.label}>Tipo de Consumo</Text>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue: string) => setTipo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Energia" value="ENERGIA" />
            <Picker.Item label="Papel" value="PAPEL" />
            <Picker.Item label="Transporte" value="TRANSPORTE" />
          </Picker>

          <Text style={styles.label}>{LABELS_BY_TIPO[tipo]}</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 10 ou 12,5"
            keyboardType="decimal-pad"
            value={valor}
            onChangeText={setValor}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text style={styles.label}>Sensor</Text>
          <Picker
            selectedValue={sensorId}
            onValueChange={(itemValue: number) => setSensorId(itemValue)}
            style={styles.picker}
          >
            {sensores.map((s) => (
              <Picker.Item
                key={s.id}
                label={`${s.tipo_sensor} - ${s.localizacao}`}
                value={s.id}
              />
            ))}
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={atualizar}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
  },
  picker: {
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});