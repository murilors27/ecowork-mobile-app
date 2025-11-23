import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { api } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

import { EcoText } from "../../../components/EcoText";
import { EcoButton } from "../../../components/EcoButton";
import { theme } from "../../../theme/theme";

import { Feather } from "@expo/vector-icons";

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
      const resp = await api.get(`/api/consumos/${id}`);
      const reg = resp.data;

      setTipo(reg.tipo);
      setValor(String(reg.valor));
      setSensorId(reg.sensor?.id ?? 0);
    } catch (err: any) {
      Alert.alert("Erro", "Não foi possível carregar o registro.");
      navigation.goBack();
    }
  }

  async function carregarSensores() {
    try {
      const resp = await api.get("/api/sensores");
      setSensores(resp.data);

      if (resp.data.length > 0 && sensorId === 0) {
        setSensorId(resp.data[0].id);
      }
    } catch (err: any) {
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
      return Alert.alert("Atenção", "Informe um valor válido maior que zero.");
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

      await api.put(`/api/consumos/${id}`, payload);

      Alert.alert("Sucesso", "Registro atualizado!");
      navigation.goBack();
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err?.response?.data?.message || "Erro ao atualizar o registro."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* TÍTULO */}
          <EcoText
            type="title"
            style={{ textAlign: "center", marginBottom: theme.spacing.md }}
          >
            Editar Registro
          </EcoText>

          {/* TIPO */}
          <EcoText type="label" style={styles.label}>
            Tipo de Consumo
          </EcoText>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={tipo}
              onValueChange={(v: string) => setTipo(v)}
            >
              <Picker.Item label="Energia" value="ENERGIA" />
              <Picker.Item label="Papel" value="PAPEL" />
              <Picker.Item label="Transporte" value="TRANSPORTE" />
            </Picker>
          </View>

          {/* VALOR */}
          <EcoText type="label" style={styles.label}>
            {LABELS_BY_TIPO[tipo]}
          </EcoText>
          <TextInput
            style={styles.input}
            placeholder="Ex: 10 ou 12,5"
            value={valor}
            keyboardType="decimal-pad"
            onChangeText={setValor}
          />

          {/* SENSOR */}
          <EcoText type="label" style={styles.label}>
            Sensor
          </EcoText>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={sensorId}
              onValueChange={(v: number) => setSensorId(v)}
            >
              {sensores.map((s) => (
                <Picker.Item
                  key={s.id}
                  label={`${s.tipo_sensor} - ${s.localizacao}`}
                  value={s.id}
                />
              ))}
            </Picker>
          </View>

          {/* BOTÃO */}
          <EcoButton
            title="Salvar Alterações"
            icon={<Feather name="save" size={20} color="#FFF" />}
            color={theme.colors.primary}
            loading={saving}
            style={{ marginTop: theme.spacing.lg }}
            onPress={atualizar}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
});
