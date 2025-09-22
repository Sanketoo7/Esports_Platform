// src/screens/TournamentRegisterScreen.js
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import API from "../api";

export default function TournamentRegisterScreen({ route, navigation }) {
  const { id } = route.params;

  const handleRegister = async () => {
    try {
      await API.post(`/tournaments/${id}/register`);
      Alert.alert("Success", "You have registered!");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for Tournament</Text>
      <CustomButton text="Confirm Registration" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});