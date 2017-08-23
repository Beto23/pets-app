import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class PetLostDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Detalle mascotas peridas</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
});

export default PetLostDetail;
