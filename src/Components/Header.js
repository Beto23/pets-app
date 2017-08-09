//Dependencies
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.props.toggle}>
                    <Icon
                        name="bars"
                        color="black"
                        size={25}
                    />
                </TouchableWithoutFeedback>
                <Image style={styles.logo} source={require('../Images/pet.png')} />
                <Icon
                    name="search"
                    color="black"
                    size={25}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0"
    },
    logo: {
        width: 50,
        height: 50
    }
});

export default Header;