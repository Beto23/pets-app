//Dependencies
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native'

//Components
import Form from '../Components/PetForm';

class PetLostAdd extends Component {

    constructor(props) {
        super(props);
    }

     render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Form isLostPet={true}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
    }
});

export default PetLostAdd;