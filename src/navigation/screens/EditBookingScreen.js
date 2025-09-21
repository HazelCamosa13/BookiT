import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


export default function EditBookingScreen({ route, navigation }) {
const booking = route.params.booking;
const [hotelName, setHotelName] = useState(booking.hotelName);
const [roomType, setRoomType] = useState(booking.roomType);
const [checkin, setCheckin] = useState(booking.checkin);
const [checkout, setCheckout] = useState(booking.checkout);


const handleUpdate = async () => {
try {
const ref = doc(db, 'bookings', booking.id);
await updateDoc(ref, { hotelName, roomType, checkin, checkout });
navigation.goBack();
} catch (err) {
Alert.alert('Error', err.message);
}
};


const handleDelete = async () => {
try {
const ref = doc(db, 'bookings', booking.id);
await deleteDoc(ref);
navigation.goBack();
} catch (err) {
Alert.alert('Error', err.message);
}
};


return (
<View style={{ padding: 12 }}>
<TextInput value={hotelName} onChangeText={setHotelName} />
<TextInput value={roomType} onChangeText={setRoomType} />
<TextInput value={checkin} onChangeText={setCheckin} />
<TextInput value={checkout} onChangeText={setCheckout} />
<Button title="Save changes" onPress={handleUpdate} />
<Button title="Delete booking" onPress={handleDelete} />
</View>
);
}