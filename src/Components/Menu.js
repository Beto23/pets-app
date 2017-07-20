//Dependencies
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

// const { width, height } = Dimensions.get(window);

class Menu extends Component {
    render() {
        return(
            <View style={styles.menu}>
                <Text>Menu</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: "red"
    }
});

export default Menu;