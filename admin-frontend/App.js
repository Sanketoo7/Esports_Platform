// App.js
import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export const AdminAuthContext = createContext();

export default function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AdminAuthContext.Provider>
  );
}