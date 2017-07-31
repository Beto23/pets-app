//Dependencies
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'

//Components
import PhotoPicker from '../Components/ImagePicker';

class PetAdd extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <PhotoPicker />
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