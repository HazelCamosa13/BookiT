import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';


export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


useEffect(() => {
const unsub = onAuthStateChanged(auth, user => {
if (user) navigation.replace('Home');
});
return unsub;
}, []);


const handleLogin = async () => {
try {
await signInWithEmailAndPassword(auth, email.trim(), password);
navigation.replace('Home');
} catch (err) {
Alert.alert('Login error', err.message);
}
};


return (
<View style={{ padding: 16 }}>
<Text>Login</Text>
<TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
<Button title="Login" onPress={handleLogin} />
<Button title="Create account" onPress={() => navigation.navigate('Signup')} />
</View>
);
}
