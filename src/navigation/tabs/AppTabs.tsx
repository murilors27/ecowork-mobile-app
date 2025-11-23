import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../../screens/app/home/HomeScreen";
import DashboardScreen from "../../screens/app/dashboard/DashboardScreen";
import RegistrosScreen from "../../screens/app/registros/RegistrosScreen";
import RankingScreen from "../../screens/app/ranking/RankingScreen";
import EcoassistScreen from "../../screens/app/ecoassist/EcoassistScreen";
import SobreScreen from "../../screens/app/about/AboutScreen";

import { theme } from "../../theme/theme";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,

        tabBarStyle: {
          height: 62,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: theme.colors.card,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={23} color={color} />
          ),
          tabBarLabel: "Início",
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={23} color={color} />
          ),
          tabBarLabel: "Dashboard",
        }}
      />

      <Tab.Screen
        name="Registros"
        component={RegistrosScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={23} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Ranking"
        component={RankingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy-outline" size={23} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EcoAssist"
        component={EcoassistScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="leaf-outline" size={23} color={color} />
          ),
          tabBarLabel: "EcoAssist",
        }}
      />

      <Tab.Screen
        name="Sobre"
        component={SobreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={23}
              color={color}
            />
          ),
          tabBarLabel: "Sobre",
        }}
      />
    </Tab.Navigator>
  );
}
