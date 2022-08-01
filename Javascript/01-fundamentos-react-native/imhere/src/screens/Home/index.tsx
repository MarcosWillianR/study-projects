import { useCallback, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  const handleAddParticipant = useCallback(() => {
    if (name.length > 0) {
      const sameName = participants.find(p => p === name);
      if (sameName) {
        return Alert.alert('Participant already exists', 'Please enter a different name', [{ text: 'OK' }]);
      }
      setParticipants(state => [...state, name]);
      setName('');
    }
  }, [name, participants])

  const handleRemoveParticipant = useCallback((name: string) => {
    Alert.alert('Remove participant', `Are you sure you want to remove participant ${name}?`, [
      { text: 'Cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setParticipants(participants.filter(p => p !== name)) }
    ]);
  }, [participants])

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Event name</Text>
      <Text style={styles.eventDate}>Friday, November 4, 2022</Text>

      <View style={styles.addParticipantWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Participan's name"
          placeholderTextColor="#6B6B6B"
          onChangeText={setName}
          value={name}
          onEndEditing={handleAddParticipant}
          returnKeyType="send"
        />

        <Pressable style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        ListEmptyComponent={() => <Text style={styles.emptyList}>Nenhum participante no evento atual.</Text>}
        renderItem={({ item: name }) => (
          <Participant
            key={name}
            name={name}
            onRemove={handleRemoveParticipant}
          />
        )}
      />
    </View>
  )
}