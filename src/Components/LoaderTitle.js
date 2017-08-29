// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

class LoaderTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} />
        <Text>Obteniendo Mascotas....</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoaderTitle;
