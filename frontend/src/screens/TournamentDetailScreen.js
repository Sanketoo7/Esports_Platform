// src/screens/TournamentDetailScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import API from "../api";

export default function TournamentDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    fetchTournament();
  }, []);

  const fetchTournament = async () => {
    try {
      const res = await API.get(`/tournaments/${id}`);
      setTournament(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch tournament");
    }
  };

  return (
    <View style={styles.container}>
      {tournament ? (
        <>
          <Text style={styles.title}>{tournament.name}</Text>
          <Text>Game: {tournament.game}</Text>
          <Text>Prize: ₹{tournament.prize}</Text>
          <Text>Date: {new Date(tournament.date).toDateString()}</Text>
          <CustomButton
            text="Register"
            onPress={() => navigation.navigate("TournamentRegister", { id: tournament._id })}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});