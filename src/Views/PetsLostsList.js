// Dependencies
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { firebaseDataBase } from '../firebase';

// Components
import ListPet from './PetsList';

class PetsLostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const pets = firebaseDataBase.ref('petLost');
    pets.on('value', snapshot => {
      const data = snapshot.val();
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj._key = key;
        return obj;
      });
      this.setState({ data: dataWithKeys });
    });
  }

  render() {
    return (
      <View style={styles.containter}>
        <ListPet data={this.state.data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#e9ebee',
    paddingTop: 60,
  },
});

export default PetsLostsList;
