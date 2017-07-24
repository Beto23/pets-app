//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';

//Components
import CardDescription from '../Components/CardDescription';

class PetsLostsList extends Component {
    _keyExtractor = (item, index) => item.id;

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

  componentDidMount() {
    // Simulacion de listado de 10 datos
    let data = [];
    for (var index = 0; index <= 10; index++) {
      data.push({id: index})
    }
    this.setState({data: data});
  }

    render() {
        return(
            <View style={styles.containter}>
                <FlatList 
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={(item, key) => <TouchableOpacity><CardDescription/></TouchableOpacity> }>
                </FlatList>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: "white"
    }
})

export default PetsLostsList;