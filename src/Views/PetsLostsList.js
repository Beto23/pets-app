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
      isLoaderShow: false,
    };
  }

  componentDidMount() {
    this.getPetsLost();
  }

  getPetsLost = () => {
    this.setState({ isLoaderShow: true });
    const pets = firebaseDataBase.ref('petLost');
    pets.on('value', snapshot => {
      const data = snapshot.val();
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj._key = key;
        return obj;
      });
      this.setState({ data: dataWithKeys });
      this.setState({ isLoaderShow: false });
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
          isLoaderShow={this.state.isLoaderShow}
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
