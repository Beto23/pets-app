// Dependencies
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { firebaseDataBase } from '../firebase';

// Components
import Card from '../Components/Card';

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

    _keyExtractor = (item) => item._key;

    handleClick = (data) => {
      Actions.PetDetail({ data, isPetLost: true });
    }

    renderItem(item) {
      return (
        <TouchableOpacity onPress={() => this.handleClick(item.item)}>
          <Card item={item.item} />
        </TouchableOpacity>
      );
    }

    render() {
      return (
        <View style={styles.containter}>
          <FlatList 
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={(item) => this.renderItem(item)}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white',
  },
});

export default PetsLostsList;
