import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';


export default function AddBookingScreen({ navigation }) {
const [hotelName, setHotelName] = useState('');
const [roomType, setRoomType] = useState('');
const [checkin, setCheckin] = useState('');
const [checkout, setCheckout] = useState('');


const handleCreate = async () => {
if (!hotelName) return Alert.alert('Validation', 'Please enter hotel name');
try {
await addDoc(collection(db, 'bookings'), {
hotelName,
roomType,
checkin,
checkout,
userId: auth.currentUser.uid,
createdAt: new Date()
});
navigation.goBack();
} catch (err) {
Alert.alert('Error', err.message);
}
};


return (
<View style={{ padding: 12 }}>
<TextInput placeholder="Hotel name" value={hotelName} onChangeText={setHotelName} />
<TextInput placeholder="Room type" value={roomType} onChangeText={setRoomType} />
<TextInput placeholder="Check-in date" value={checkin} onChangeText={setCheckin} />
<TextInput placeholder="Check-out date" value={checkout} onChangeText={setCheckout} />
<Button title="Create booking" onPress={handleCreate} />
</View>
);
}