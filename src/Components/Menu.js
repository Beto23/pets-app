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

import { Actions } from "react-native-router-flux";

//Components
import ItemBox from './ItemBox';

//paths
import { menuPaths } from '../menuPaths';

// const { width, height } = Dimensions.get(window);

class Menu extends Component {

    handlePath = (item) => {
        switch (item.id) {
            case 1:
                // Actions.AddPet);            
                break;
            case 2:
                Actions.PetsLostsList();
            default:
                break;
        }
        this.props.closeMenu();
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