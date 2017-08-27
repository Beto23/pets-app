// Dependencies
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { firebaseDataBase } from '../firebase';

// Components
import Card from '../Components/Card';

class PetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  _keyExtractor = (item) => item._key;

  handleCardClick = (data) => {
    Actions.PetDetail({ data });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          renderItem={(item, key) => (<TouchableOpacity
            key={key} onPress={() => this.handleCardClick(item.item)}
          ><Card item={item.item} /></TouchableOpacity>)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9ebee',
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default PetsList;
