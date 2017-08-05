//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
// import validate from 'validate.js'
const { width } = Dimensions.get('window');
const widthRow = (width / 2 - 15);

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
            breed: '',
            age: '',
            gender: '',
            description: '',
            nameContact: '',
            phone: null,
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
                    <View style={styles.row}>
                        <TextField
                            onChangeText={value => this.handleField(value, 'name', validationPet.name, 'nameError')}
                            onBlur={(value) => this.handleField(value, 'name', validationPet.name, 'nameError')}
                            error={this.state.nameError}
                            labelName="Nombre"
                            width={widthRow}/>
                        <TextField
                            onChangeText={value => this.handleField(value, 'breed', validationPet.name, 'breedError')}
                            onBlur={(value) => this.handleField(value, 'breed', validationPet.name, 'breedError')}
                            error={this.state.breedError}
                            labelName="Raza"
                            width={widthRow}/>
                    </View>

                    <View style={styles.row}>
                        <TextField
                            onChangeText={value => this.handleField(value, 'age', validationPet.name, 'ageError')}
                            onBlur={(value) => this.handleField(value, 'age', validationPet.name, 'ageError')}
                            error={this.state.ageError}
                            labelName="Edad"
                            width={widthRow}/>
                        <TextField
                            onChangeText={value => this.handleField(value, 'gender', validationPet.name, 'genderError')}
                            onBlur={(value) => this.handleField(value, 'gender', validationPet.name, 'genderError')}
                            error={this.state.genderError}
                            labelName="Genero"
                            width={widthRow}/>
                    </View>

                    <TextField
                        onChangeText={value => this.handleField(value, 'description', validationPet.name, 'descriptionError')}
                        onBlur={(value) => this.handleField(value, 'description', validationPet.name, 'descriptionError')}
                        error={this.state.descriptionError}
                        labelName="Descripcion"
                        multiline={true}
                        height={100}/>
                    <View>
                        <Text style={{marginBottom: 10}}>Contacto</Text>
                        <View style={styles.row}>
                            <TextField
                                onChangeText={value => this.handleField(value, 'nameContact', validationPet.name, 'nameContactError')}
                                onBlur={(value) => this.handleField(value, 'nameContact', validationPet.name, 'nameContactError')}
                                error={this.state.nameContactError}
                                labelName="Nombre Contacto"
                                width={widthRow}/>
                            <TextField
                                onChangeText={value => this.handleField(value, 'phone', validationPet.name, 'phoneError')}
                                onBlur={(value) => this.handleField(value, 'phone', validationPet.name, 'phoneError')}
                                error={this.state.phoneError}
                                labelName="Telefono"
                                width={widthRow}/>
                        </View>

                        <TextField
                            onChangeText={value => this.handleField(value, 'email', validationPet.email, 'emailError')}
                            onBlur={(value) => this.handleField(value, 'email', validationPet.email, 'emailError')}
                            error={this.state.emailError}
                            labelName="Email"/>
                    </View>
                    <View style={styles.submitContainer}>
                        <Button
                            onPress={this.register}
                            title="Enviar"
                            color= "#1db954"/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputRow: {
        width: 15,
        backgroundColor: 'red'
    },
    submitContainer: {
        marginBottom: 20,
        marginTop: 10
    }
});

export default PetForm;