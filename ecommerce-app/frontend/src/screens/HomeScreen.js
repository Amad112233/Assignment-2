import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Searchbar, Text } from 'react-native-paper';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import * as Animatable from 'react-native-animatable';
import { useCart } from '../store/CartContext';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const { addToCart, token, loginDemo } = useCart();

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!token) loginDemo().catch(()=>{});
  }, [token]);

  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <ScrollView style={{ padding: 12 }}>
      <Searchbar placeholder="Search products..." value={q} onChangeText={setQ} />
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {!loading && filtered.length === 0 && <Text style={{ marginTop: 12 }}>No products found.</Text>}
      <View style={{ marginTop: 8 }}>
        {filtered.map(p => (
          <Animatable.View key={p.id} animation="fadeInUp" duration={400} delay={50}>
            <ProductCard
              product={p}
              onPress={() => navigation.navigate('ProductDetails', { product: p })}
              onAdd={() => addToCart(p.id, 1)}
            />
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
}
