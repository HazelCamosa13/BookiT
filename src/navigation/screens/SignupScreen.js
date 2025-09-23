import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { validateEmail, validatePassword } from "../utils/validator";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!validateEmail(email)) return Alert.alert("Invalid email");
    if (!validatePassword(password)) return Alert.alert("Password must be at least 6 chars");

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Account created");
      navigation.replace("Home");
    } catch (err) {
      Alert.alert("Signup error", err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Create an Account</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{borderWidth:1,marginVertical:8,padding:8}} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{borderWidth:1,marginVertical:8,padding:8}} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}