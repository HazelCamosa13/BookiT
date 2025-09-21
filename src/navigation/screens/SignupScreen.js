import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';


export default function SignupScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const handleSignup = async () => {
try {
await createUserWithEmailAndPassword(auth, email.trim(), password);
Alert.alert('Success', 'Account created');
navigation.replace('Home');
} catch (err) {
Alert.alert('Signup error', err.message);
}
};


return (
<View style={{ padding: 16 }}>
<Text>Signup</Text>
<TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
<Button title="Create account" onPress={handleSignup} />
<Button title="Have an account? Login" onPress={() => navigation.navigate('Login')} />
</View>
);
}