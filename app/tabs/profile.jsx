import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function ProfileScreen() {
  const { user, logout, updateProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Local state
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // Colors (new palette)
  const colors = {
    background: isDark ? "#1C1C1E" : "#F5FDFB",
    card: isDark ? "#2C2C2E" : "#E0F7F4",
    accent: "#7845a8ff", // Teal
    text: isDark ? "#FFFFFF" : "#1C1C1E",
    subText: isDark ? "#A1A1AA" : "#4B5563",
    danger: "#2b15f1ff",
  };

  const confirmLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({ name, email });
      Alert.alert("Profile Updated", "Your changes were saved!");
      setModalVisible(false);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Section */}
      <View style={styles.centerContent}>
        <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="person-circle-outline" size={120} color={colors.accent} />
        </View>

        <Text style={[styles.name, { color: colors.text }]}>
          {user?.name || "Guest"}
        </Text>
        <Text style={[styles.email, { color: colors.subText }]}>
          {user?.email || "No email"}
        </Text>

        {/* Edit Button */}
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: colors.accent }]}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Theme Toggle */}
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: colors.card }]}
          onPress={toggleTheme}
        >
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={20}
            color={colors.accent}
          />
          <Text style={[styles.buttonText, { color: colors.accent }]}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={[styles.fullWidthButton, { backgroundColor: colors.danger }]}
          onPress={confirmLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Edit Profile
            </Text>

            <Text style={[styles.label, { color: colors.text }]}>Name</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.accent, color: colors.text }]}
              placeholder="Enter name"
              placeholderTextColor={colors.subText}
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.accent, color: colors.text }]}
              placeholder="Enter email"
              placeholderTextColor={colors.subText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.accent }]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.danger }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", alignItems: "center", padding: 20 },
  centerContent: { alignItems: "center", width: "100%", paddingTop: 50 },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  name: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  email: { fontSize: 16, marginBottom: 30 },
  fullWidthButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    gap: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: { width: "90%", padding: 20, borderRadius: 16 },
  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
});

