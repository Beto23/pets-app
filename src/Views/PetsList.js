// Dependencies
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Components
import Card from '../Components/Card';
import Loader from '../Components/LoaderTitle.js';

class PetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  _keyExtractor = (item) => item._key;

  handleCardClick = (data) => {
    Actions.PetDetail({ data, isPetAdop: this.props.isPetAdop });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.data.length === 0 ? <Loader /> : <FlatList 
            data={this.props.data}
            keyExtractor={this._keyExtractor}
            renderItem={(item, key) => (<TouchableOpacity
              key={key} onPress={() => this.handleCardClick(item.item)}
            ><Card item={item.item} /></TouchableOpacity>)}
          />  
        } 
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
