import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useCart } from '../store/CartContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  return (
    <ScrollView style={{ padding: 16 }}>
      <Image source={{ uri: product.image_url }} style={{ width: '100%', height: 260, borderRadius: 8 }} />
      <Text variant="titleLarge" style={{ marginTop: 12 }}>{product.name}</Text>
      <Text variant="titleMedium">${Number(product.price).toFixed(2)}</Text>
      <Text style={{ marginTop: 8 }}>{product.description}</Text>
      <Button mode="contained" style={{ marginTop: 16 }} onPress={() => addToCart(product.id)}>
        Add to Cart
      </Button>
      <Button style={{ marginTop: 8 }} onPress={() => navigation.navigate('Checkout')}>
        Go to Checkout
      </Button>
    </ScrollView>
  );
}
