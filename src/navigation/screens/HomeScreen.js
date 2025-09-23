import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>📚 Welcome to BookiT Readings</Text>
      {user && <Text>Signed in as: {user.email}</Text>}
      <View style={{ marginVertical: 10 }}>
        <Button title="Manage Novels" onPress={() => navigation.navigate("Novels")} />
      </View>
      <Button title="Logout" onPress={() => signOut(auth).then(() => navigation.replace("Login"))} />
    </View>
  );
}