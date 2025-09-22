import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function TournamentManagementScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tournament Management</Text>
      <Button
        title="Create New Tournament"
        onPress={() => navigation.navigate("CreateTournament")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});