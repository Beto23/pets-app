// Dependencies
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Components
import Form from '../Components/PetForm';

class PetLostAdd extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form isLostPet />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
});

export default PetLostAdd;
