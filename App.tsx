import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Player from './components/Player.tsx'

export default function App() {
  return (
    <View style={styles.container}>     
		 <Player />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
