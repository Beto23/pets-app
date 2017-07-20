//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

class ItemBox extends Component {
    render() {
        return(
            <View style={styles.box}>
                <Text>Publicar Mascota</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "white",
        padding: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0"
    }
});

export default ItemBox;