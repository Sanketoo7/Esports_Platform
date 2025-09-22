// src/screens/ProfileScreen.js
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../../App";

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.info}>Username: {user.username}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <CustomButton text="Logout" onPress={() => setUser(null)} />
        </>
      ) : (
        <Text>No user logged in</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
});