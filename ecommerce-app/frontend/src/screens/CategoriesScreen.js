import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { api } from '../services/api';

export default function CategoriesScreen({ navigation }) {
  const [cats, setCats] = useState([]);

  useEffect(() => { api.get('/products/categories').then(r => setCats(r.data)); }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="titleLarge">Categories</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
        {cats.map(c => (
          <Button key={c} style={{ margin: 6 }} mode="outlined" onPress={() => navigation.navigate('Home', { category: c })}>
            {c}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
}
