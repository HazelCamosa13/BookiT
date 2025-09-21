import React from 'react';
import { View, Text, Button } from 'react-native';


export default function BookingCard({ booking, onEdit }) {
return (
<View style={{ borderWidth: 1, padding: 8, marginVertical: 6 }}>
<Text style={{ fontWeight: 'bold' }}>{booking.hotelName}</Text>
<Text>Room: {booking.roomType}</Text>
<Text>Check-in: {booking.checkin}</Text>
<Text>Check-out: {booking.checkout}</Text>
<Button title="Edit" onPress={onEdit} />
</View>
);
}