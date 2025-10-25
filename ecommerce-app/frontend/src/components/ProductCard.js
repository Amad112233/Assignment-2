import React from 'react';
import { Card, Button, Text } from 'react-native-paper';

export default function ProductCard({ product, onPress, onAdd }) {
  return (
    <Card style={{ marginVertical: 8 }} onPress={onPress}>
      <Card.Cover source={{ uri: product.image_url }} />
      <Card.Title title={product.name} subtitle={`$${Number(product.price).toFixed(2)}`} />
      <Card.Content>
        <Text numberOfLines={2}>{product.description}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onAdd}>Add to Cart</Button>
      </Card.Actions>
    </Card>
  );
}
