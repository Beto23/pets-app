//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Actions } from "react-native-router-flux";


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

    handleClick = (item) => {
        Actions.PetLostDetail({item})
    }

    renderItem (item) {
        return(
            <TouchableOpacity onPress={(item) =>this.handleClick(item.item)}>
                <CardDescription/>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <View style={styles.containter}>
                <FlatList 
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={(item, key) => this.renderItem(item) }>
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