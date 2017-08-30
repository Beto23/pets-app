// Dependencies
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { firebaseDataBase } from '../firebase';

// Components
import ContainerHeaderList from '../Components/ContainerHeaderList';

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
        <ContainerHeaderList
          data={this.state.data}
          pathRef={'petLost'}
          isHome={false}
          headerTitle='Mascotas Perdidas'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
});

export default PetsLostsList;
