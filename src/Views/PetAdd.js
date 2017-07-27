import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

class PetAdd extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Text>Photo</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20
    }
});

export default PetAdd;