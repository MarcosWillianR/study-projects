import { useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const handleAddParticipant = useCallback(() => {
    console.log('Teste');
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2022</Text>

      <View style={styles.addParticipantWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />

        <Pressable style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Participant />
    </ScrollView>
  )
}