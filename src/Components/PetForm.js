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

    // validateForm = () => {
    //     const nameError = validate('name', this.state.name, validationPet.name)
    //     const emailError = validate('email', this.state.email, validationPet.email)

    //     this.setState({
    //         nameError: nameError,
    //         emailError: emailError
    //     })

    //     if(!emailError && !nameError) {
    //         console.log('formulario valido');
    //         this.setState({isInvalidForm: false});
    //     } else {
    //         this.setState({isInvalidForm: true});
    //     }
    // }

    handleField = (value, fieldName, validation, error) => {
        /*
            new object is crated whit key and value of the field to set in the state
            ej const fomr = {}; 
            form: {email: 'email@example.com'}
        */
        const fielfValue = {}
        fielfValue[fieldName] = value;
        this.setState(fielfValue);
        /*
            new object is crated whit key and value of the error to set in the state
            ej const error = {}; 
            form: {errorEmail: 'email is required'}
        */
        const typeError = {}
        typeError[error] = validate(fieldName, value, validation);
        this.setState(typeError);
    }

    register = () => {
        console.log('Enviando a firebase');
    }


    render() {
        console.log(this.state);
        return(
            <View>
                <View style={styles.container}>
                    {/* <PhotoPicker /> */}
                    <TextField
                        onChangeText={value => this.handleField(value, 'name', validationPet.name, 'nameError')}
                        onBlur={(value) => this.handleField(value, 'name', validationPet.name, 'nameError')}
                        error={this.state.nameError}
                        labelName="Nombre"/>

                    <TextField
                        onChangeText={value => this.handleField(value, 'email', validationPet.email, 'emailError')}
                        onBlur={(value) => this.handleField(value, 'email', validationPet.email, 'emailError')}
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