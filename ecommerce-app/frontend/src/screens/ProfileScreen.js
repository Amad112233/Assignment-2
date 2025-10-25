import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { api } from '../services/api';
import { useCart } from '../store/CartContext';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const { token } = useCart();

  useEffect(() => {
    if (!token) return;
    api.get('/users/me').then(res => {
      setProfile(res.data);
      setName(res.data.name || '');
      setAddress(res.data.address || '');
    });
  }, [token]);

  const save = async () => {
    const res = await api.put('/users/me', { name, address });
    setProfile(res.data);
  };

  if (!profile) return <Text style={{ padding: 16 }}>Loading profile...</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleLarge">Profile</Text>
      <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={{ marginTop: 12 }} />
      <TextInput label="Address" value={address} onChangeText={setAddress} mode="outlined" style={{ marginTop: 12 }} />
      <Button mode="contained" style={{ marginTop: 16 }} onPress={save}>Save</Button>
    </ScrollView>
  );
}
