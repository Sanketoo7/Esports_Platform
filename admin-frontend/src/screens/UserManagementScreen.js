import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const dummyUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

export default function UserManagementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={dummyUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.user}>{item.name} - {item.email}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  user: { fontSize: 16, marginBottom: 10 },
});