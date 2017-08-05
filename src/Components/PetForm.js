//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
// import validate from 'validate.js'

//Components
import PhotoPicker from './ImagePicker';
import Map from './Map';
import TextField from './TextField';
import validationPet from '../shared/petValidation';
import validate from '../shared/validationWrapper';

class PetForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        } 
    }

    register = () => {
        const nameError = validate('name', this.state.name, validationPet.name);
        const emailError = validate('email', this.state.email, validationPet.email);

        this.setState({
            emailError: emailError,
            nameError: nameError
        });

        if(!emailError && !nameError) {
            console.log('formulario valido');
        }
    }


    render() {
        console.log(this.state);
        return(
            <View>
                <View style={styles.container}>
                    {/* <PhotoPicker /> */}
                    <TextField
                        onChangeText={value => this.setState({name: value.trim()})}
                        onBlur={(value) => {
                            this.setState({
                                nameError: validate('name', value, validationPet.name)
                            });
                        }}
                        error={this.state.nameError}
                        labelName="Nombre"/>

                    <TextField
                        onChangeText={value => this.setState({email: value.trim()})}
                        onBlur={(value) => {
                            this.setState({
                                emailError: validate('email', value, validationPet.email)
                            });
                        }}
                        error={this.state.emailError}
                        labelName="Email"/>
                    <Button
                        onPress={this.register}
                        title="Enviar"
                        color= "#1db954"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    }
});

export default PetForm;