import React from "react";
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
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="AppTabs" component={AppTabs} />

          <Stack.Screen name="Registrar" component={RegistrarScreen} />
          <Stack.Screen
            name="EditarRegistro"
            component={EditarRegistroScreen}
          />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
