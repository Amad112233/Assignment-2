import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, IconButton, Text } from 'react-native-paper';
import { useCart } from '../store/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, fetchCart, updateQty, removeFromCart, checkout, loading } = useCart();

  useEffect(() => { fetchCart(); }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScrollView style={{ padding: 12 }}>
      <Text variant="titleLarge">Your Cart</Text>
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {!loading && cart.length === 0 && <Text style={{ marginTop: 12 }}>Cart is empty.</Text>}
      {cart.map((it) => (
        <View key={it.product_id} style={{ paddingVertical: 8, borderBottomWidth: 0.5, borderColor: '#ddd' }}>
          <Text variant="titleMedium">{it.name}</Text>
          <Text>${Number(it.price).toFixed(2)} x {it.quantity}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton icon="minus" onPress={() => updateQty(it.product_id, Math.max(1, it.quantity-1))} />
            <IconButton icon="plus" onPress={() => updateQty(it.product_id, it.quantity+1)} />
            <Button onPress={() => removeFromCart(it.product_id)}>Remove</Button>
          </View>
        </View>
      ))}
      <Text style={{ marginTop: 12 }} variant="titleMedium">Total: ${total.toFixed(2)}</Text>
      <Button mode="contained" style={{ marginTop: 12 }} onPress={async () => {
        const res = await checkout('123 Demo Street');
        navigation.navigate('HomeTab', { screen: 'OrderConfirmation', params: { order: res } });
      }}>Proceed to Checkout</Button>
    </ScrollView>
  );
}
