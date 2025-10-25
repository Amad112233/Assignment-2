import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { order } = route.params || {};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text variant="headlineMedium">Order Placed 🎉</Text>
      <Text style={{ marginTop: 8 }}>Order ID: {order?.orderId}</Text>
      <Text>Estimated delivery in 3–5 days.</Text>
      <Button style={{ marginTop: 16 }} onPress={() => navigation.popToTop()}>Back to Home</Button>
    </View>
  );
}
