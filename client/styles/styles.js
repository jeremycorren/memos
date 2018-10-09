import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  prompt: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    margin: 10
  },
  recordingIcon: {
    width: 50,
    height: 50
  },
  soundIcon: {
    width: 20,
    height: 20,
    margin: 10
  }
});

export default styles;