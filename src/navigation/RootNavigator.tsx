import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";

import AuthStack from "./stacks/AuthStack";
import AppTabs from "./tabs/AppTabs";

import RegistrarScreen from "../screens/app/registros/RegistrarScreen";
import EditarRegistroScreen from "../screens/app/registros/EditarRegistroScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={token ? "AppTabs" : "AuthStack"}
    >
      {token ? (
        <>
          <Stack.Screen name="AppTabs" component={AppTabs} />
          <Stack.Screen name="Registrar" component={RegistrarScreen} />
          <Stack.Screen name="EditarRegistro" component={EditarRegistroScreen} />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}