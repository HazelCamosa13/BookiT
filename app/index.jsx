import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { register, login } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isSignIn) {
        await login(email, password);
        Alert.alert("Success", "Signed in!");
        router.replace("/tabs/search");
      } else {
        if (password !== confirm) {
          Alert.alert("Error", "Passwords do not match");
          return;
        }
        await register(name, email, password);
        Alert.alert("Success", "Account created! Please sign in.");
        setIsSignIn(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirm("");
      }
    } catch (error) {
      Alert.alert("Auth Error", error.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>📖 BookiT</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>
          {isSignIn ? "Welcome Back 👋" : "Join Us Today ✨"}
        </Text>
        <Text style={styles.subtitle}>
          {isSignIn
            ? "Sign in to continue your reading journey"
            : "Create an account and discover new stories"}
        </Text>

        {!isSignIn && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {!isSignIn && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
          <Text style={styles.switchText}>
            {isSignIn
              ? "Don’t have an account? Create one"
              : "Already have an account? Sign in"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#44cec7ff", // ✅ clean beige coffee-inspired background
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 40,
    color: "#0733f5ff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#07d1f5ff",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  switchText: {
    marginTop: 18,
    fontSize: 14,
    color: "#6b4226",
    textAlign: "center",
  },
});
