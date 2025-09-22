// src/navigation/AppNavigator.js
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../App";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CommunityScreen from "../screens/CommunityScreen";
import JoinTournamentScreen from "../screens/JoinTournamentScreen";
import TournamentListScreen from "../screens/TournamentListScreen";
import TournamentDetailScreen from "../screens/TournamentDetailScreen";
import TournamentRegisterScreen from "../screens/TournamentRegisterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Community" component={CommunityScreen} />
          <Stack.Screen name="JoinTournament" component={JoinTournamentScreen} />
          <Stack.Screen name="TournamentList" component={TournamentListScreen} />
          <Stack.Screen name="TournamentDetail" component={TournamentDetailScreen} />
          <Stack.Screen name="TournamentRegister" component={TournamentRegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}