//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Actions } from "react-native-router-flux";
import {firebaseDataBase } from '../firebase';

//Components
import Card from '../Components/Card';

class PetsList extends Component {
  _keyExtractor = (item, index) => item._key;

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const pets = firebaseDataBase.ref('pet');
    pets.on('value', snapshot => {
      let data = snapshot.val();
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj._key = key;
        return obj;
      });
      this.setState({data: dataWithKeys})
      console.log(dataWithKeys);
    })
  }

  handleCardClick = (data) =>{
    Actions.PetDetail({data});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={(item, key) => <TouchableOpacity key={key} onPress={() => this.handleCardClick(item.item)}><Card item={item.item}/></TouchableOpacity> }>
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9ebee",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10
  }
})

export default PetsList;
