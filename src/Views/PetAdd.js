// Dependencies
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

// Components
import Form from '../Components/PetForm';

class PetAdd extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form />
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

export default PetAdd;
