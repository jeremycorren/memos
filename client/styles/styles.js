import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  card: {
    flex: 2
  },
  cardHeader: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5
  },
  recordingIcon: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  soundIcon: {
    width: 20,
    height: 20,
    marginBottom: 10
  }
});

export default styles;