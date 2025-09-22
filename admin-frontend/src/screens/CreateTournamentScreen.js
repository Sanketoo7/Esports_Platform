import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createTournament } from "../api";

export default function CreateTournamentScreen() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleCreate = async () => {
    if (!name || !date) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await createTournament({ name, date });
      if (res.success) {
        Alert.alert("Success", `Tournament "${res.tournament.name}" created!`);
        setName("");
        setDate("");
      } else {
        Alert.alert("Error", res.message || "Something went wrong");
      }
    } catch (err) {
      Alert.alert("Error", "Could not connect to backend");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Tournament</Text>
      <TextInput
        style={styles.input}
        placeholder="Tournament Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tournament Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});