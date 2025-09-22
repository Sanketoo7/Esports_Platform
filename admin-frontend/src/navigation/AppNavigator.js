// src/navigation/AppNavigator.js
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminAuthContext } from "../../App";

import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import UserManagementScreen from "../screens/UserManagementScreen";
import TournamentManagementScreen from "../screens/TournamentManagementScreen";
import CreateTournamentScreen from "../screens/CreateTournamentScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { admin } = useContext(AdminAuthContext);

  return (
    <Stack.Navigator>
      {admin ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="UserManagement" component={UserManagementScreen} />
          <Stack.Screen name="TournamentManagement" component={TournamentManagementScreen} />
          <Stack.Screen name="CreateTournament" component={CreateTournamentScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}