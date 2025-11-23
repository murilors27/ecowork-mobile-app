import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../screens/app/home/HomeScreen";
import DashboardScreen from "../../screens/app/dashboard/DashboardScreen";
import RegistrosScreen from "../../screens/app/registros/RegistrosScreen";
import RankingScreen from "../../screens/app/ranking/RankingScreen";
import EcoassistScreen from "../../screens/app/ecoassist/EcoassistScreen";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Registros" component={RegistrosScreen} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
      <Tab.Screen name="EcoAssist" component={EcoassistScreen} />
    </Tab.Navigator>
  );
}