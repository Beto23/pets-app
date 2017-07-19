//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

//Components
import Card from '../Components/Card';

class PetsList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    padding: 10
  }
})

export default PetsList;
