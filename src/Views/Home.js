import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { firebaseDataBase } from '../firebase';

// Components
import ContainerHeaderList from '../Components/ContainerHeaderList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaderShow: false,
    };
  }

  componentDidMount() {
    this.getPets();
  }

  getPets = () => {
    this.setState({ isLoaderShow: true });
    const pets = firebaseDataBase.ref('pet');
    pets.on('value', snapshot => {
      const data = snapshot.val();
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj._key = key;
        return obj;
      });
      this.setState({ data: dataWithKeys, isLoaderShow: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ContainerHeaderList
          data={this.state.data}
          pathRef={'petLost'}
          credentials={this.props.credentials}
          isHome
          isLoaderShow={this.state.isLoaderShow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default Home;
