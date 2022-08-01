import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';

export function Participant() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Marcos Willian</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
    </View>
  )
}