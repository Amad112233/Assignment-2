import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useCart } from '../store/CartContext';

export default function CheckoutScreen({ navigation }) {
  const [address, setAddress] = useState('123 Demo Street');
  const { checkout } = useCart();

  return (
    <ScrollView style={{ padding: 16 }}>
      <TextInput label="Shipping Address" value={address} onChangeText={setAddress} mode="outlined" />
      <Button mode="contained" style={{ marginTop: 16 }} onPress={async () => {
        const order = await checkout(address);
        navigation.replace('OrderConfirmation', { order });
      }}>Place Order</Button>
    </ScrollView>
  );
}
