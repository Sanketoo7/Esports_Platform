// src/screens/CommunityScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import API from "../api";

export default function CommunityScreen() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/community");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load posts");
    }
  };

  const addPost = async () => {
    try {
      const res = await API.post("/community", { text });
      setPosts([...posts, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add post");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={styles.post}>• {item.text}</Text>}
      />
      <TextInput
        placeholder="Write something..."
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <CustomButton text="Post" onPress={addPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  post: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
});