import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="novels" options={{ title: "Novels" }} />
    </Stack>
  );
}