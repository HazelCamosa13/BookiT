import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { collection, onSnapshot, query, where, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import BookingCard from '../components/BookingCard';


export default function HomeScreen({ navigation }) {
const [bookings, setBookings] = useState([]);


useEffect(() => {
const q = query(collection(db, 'bookings'), where('userId', '==', auth.currentUser.uid));
const unsub = onSnapshot(q, (snapshot) => {
const arr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
setBookings(arr);
});
return unsub;
}, []);


const handleLogout = async () => {
await signOut(auth);
navigation.replace('Login');
};


return (
<View style={{ flex: 1, padding: 12 }}>
<Button title="Add Booking" onPress={() => navigation.navigate('AddBooking')} />
<Button title="Logout" onPress={handleLogout} />
{bookings.length === 0 ? (
<Text>No bookings yet</Text>
) : (
<FlatList data={bookings} keyExtractor={item => item.id} renderItem={({ item }) => (
<BookingCard booking={item} onEdit={() => navigation.navigate('EditBooking', { booking: item })} />
)} />
)}
</View>
);
}