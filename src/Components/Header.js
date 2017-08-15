//Dependencies
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.props.toggle}>
                    <Icon
                        name="md-menu"
                        color="black"
                        size={27}
                    />
                </TouchableWithoutFeedback>
                <Image style={styles.logo} source={require('../Images/pet.png')} />
                <Icon
                    name="md-search"
                    color="black"
                    size={27}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        // borderBottomWidth: 1,
        // borderColor: "#e0e0e0",
        elevation: 2
    },
    logo: {
        width: 50,
        height: 50
    }
});

export default Header;