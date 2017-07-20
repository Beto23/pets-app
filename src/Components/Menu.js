//Dependencies
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

//Components
import ItemBox from './ItemBox';

// const { width, height } = Dimensions.get(window);

class Menu extends Component {
    render() {
        return(
            <View style={styles.menu}>
                <TouchableOpacity>
                    <ItemBox/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default Menu;