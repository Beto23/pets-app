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

//paths
import { menuPaths } from '../menuPaths';

// const { width, height } = Dimensions.get(window);

class Menu extends Component {

    handlePath = () => {
        console.warn("Fuga a la path");
    }

    render() {
        return(
            <View style={styles.menu}>
                {
                    menuPaths.map(path => {
                        return <ItemBox handleItem={this.handlePath} key={path.id} item={path}/>
                    })
                }
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