//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class ItemBox extends Component {
    render() {
        const { item, handleItem } = this.props;
        return(
            <TouchableOpacity onPress={() => handleItem(item)}>
                <View style={styles.box}>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
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