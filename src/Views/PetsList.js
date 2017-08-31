// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
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
    const { isLoaderShow, data } = this.props;
    return (
      <View style={styles.container}>
        {
          isLoaderShow ? <Loader /> : null
        }
        {
          data.length === 0 && !isLoaderShow ? <View style={styles.noData}>
            <Text style={{ fontSize: 17 }}>Sin Datos</Text>
          </View> : <FlatList 
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
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PetsList;
