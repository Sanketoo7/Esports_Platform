import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AdminAuthContext } from "../../App";

export default function DashboardScreen({ navigation }) {
  const { setAdmin } = useContext(AdminAuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Button title="Analytics" onPress={() => navigation.navigate("Analytics")} />
      <Button title="User Management" onPress={() => navigation.navigate("UserManagement")} />
      <Button title="Tournament Management" onPress={() => navigation.navigate("TournamentManagement")} />
      <Button title="Logout" onPress={() => setAdmin(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});