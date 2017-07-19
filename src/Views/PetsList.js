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

//Components
import Card from '../Components/Card';

class PetsList extends Component {
  _keyExtractor = (item, index) => item.id;

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    // Simulacion de listado de 500 datos
    let data = [];
    for (var index = 0; index <= 500; index++) {
      data.push({id: index})
    }
    this.setState({data: data});
  }

  handleCardClick = () =>{
    Actions.PetDetail()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={(item, key) => <TouchableOpacity onPress={this.handleCardClick}><Card/></TouchableOpacity> }>
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  }
})

export default PetsList;
