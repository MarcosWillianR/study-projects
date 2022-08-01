import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131016', padding: 24 },
  eventName: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 48 },
  eventDate: { color: '#6B6B6B', fontSize: 16 },
  input: {
    flex: 1,
    backgroundColor: '#1F1E25',
    height: 56,
    borderRadius: 5,
    color: '#FFF',
    padding: 16,
    fontSize: 16,
    marginRight: 16,
  },
  addParticipantWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 48,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#31CF67',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold'
  },
});