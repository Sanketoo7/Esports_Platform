// src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import API from "../api";

export default function HomeScreen({ navigation }) {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const res = await API.get("/tournaments");
      if (res.data) {
        setTournaments(res.data);
      } else {
        Alert.alert("Error", "Failed to load tournaments");
      }
    } catch (err) {
      console.error("Fetch tournaments error:", err);
      Alert.alert("Error", "Server not responding");
    }
  };

  const renderTournament = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TournamentDetail", { id: item._id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>Game: {item.game}</Text>
      <Text style={styles.info}>Prize: ₹{item.prize}</Text>
      <Text style={styles.info}>Date: {new Date(item.date).toDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Tournaments</Text>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item._id}
        renderItem={renderTournament}
        ListEmptyComponent={<Text style={styles.empty}>No tournaments available</Text>}
      />
      <CustomButton text="Profile" onPress={() => navigation.navigate("Profile")} />
      <CustomButton text="Community" onPress={() => navigation.navigate("Community")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  info: { fontSize: 14, color: "#555" },
  empty: { textAlign: "center", marginTop: 20, color: "#666" },
});