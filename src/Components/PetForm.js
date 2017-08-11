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

const { width } = Dimensions.get('window');
const widthRow = (width / 2 - 15);

//Components
import PhotoPicker from './ImagePicker';
import Map from './Map';
import TextField from './TextField';
import validationPet from '../shared/petValidation';
import validate from '../shared/validationWrapper';
import PickerField from './PickerField';

//Helper
import { HelperFormAdd } from '../shared/HelperFormAdd';
import { species } from '../shared/itemsArraysForm';

import {
    fieldName,
    fieldBreed,
    fieldAge,
    fieldGender,
    fieldDescription,
    fieldNameContact,
    fieldPhone,
    fieldEmail,
} from '../shared/fieldsAddPet';
import { firebaseAuth } from '../firebase';

class PetForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            breed: species[0].name,
            age: '',
            gender: '',
            description: '',
            nameContact: '',
            phone: null,
            email: '',
            isInvalidForm: false,
            uid: ''
        }
    }

    async componentDidMount() {
        try {
            let user = await firebaseAuth.currentUser;
            this.setState({
                uid: user.uid
            })
        } catch (error) {
            console.log(error)
        }
    }

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

        const nameError = validate(fieldName.nameField, this.state.name, fieldName.validation);        
        const breedError = validate(fieldBreed.nameField, this.state.breed, fieldBreed.validation);        
        const ageError = validate(fieldAge.nameField, this.state.age, fieldAge.validation);        
        const genderError = validate(fieldGender.nameField, this.state.gender, fieldGender.validation);        
        const descriptionError = validate(fieldGender.nameField, this.state.description, fieldGender.validation);        
        const nameContactError = validate(fieldNameContact.nameField, this.state.nameContact, fieldNameContact.validation);        
        const phoneError = validate(fieldPhone.nameField, this.state.phone, fieldPhone.validation);        
        const emailError = validate(fieldEmail.nameField, this.state.email, fieldEmail.validation);

        this.setState({
            nameError,
            breedError,
            ageError,
            genderError,
            descriptionError,
            nameContactError,
            phoneError,
            emailError
        });

        if (!nameError && !breedError && !ageError && !genderError && !descriptionError && !nameContactError && !phoneError && !emailError) {
            this.setForm();
        } else {
            console.log('form invalido');
        }
    }

    setForm = () => {
        try {
            if (this.state.uid) {
                const { name, breed, age, gender, description, nameContact, phone, email, uid } = this.state;
                const item = {name, breed, age, gender, description, nameContact, phone, email, uid}
                HelperFormAdd.addPet(item);
                console.log('Enviado......');
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        console.log(this.state, 'state')
        return(
            <View>
                <View style={styles.container}>
                    <PhotoPicker /> 
                    <View style={styles.containerPadding}>
                        <View style={styles.row}>
                            <TextField
                                onChangeText={value => this.handleField(value, 'name', validationPet.name, 'nameError')}
                                onBlur={(value) => this.handleField(value, 'name', validationPet.name, 'nameError')}
                                error={this.state.nameError}
                                labelName="Nombre"
                                width={widthRow}/>
                            {/* <TextField
                                onChangeText={value => this.handleField(value, 'breed', validationPet.name, 'breedError')}
                                onBlur={(value) => this.handleField(value, 'breed', validationPet.name, 'breedError')}
                                error={this.state.breedError}
                                labelName="Raza"
                                width={widthRow}/> */}
                            <PickerField
                                selectedValue={this.state.breed}
                                onValueChange={(itemValue, itemIndex) => this.handleField(itemValue, 'breed', validationPet.name, 'breedError')}
                                width={widthRow}
                                error={this.state.breedError}
                                label="Especie"
                                items={species}/>
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
                    </View>
                    <View style={styles.containerPadding}>
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
                                width={widthRow}
                                keyboardType="phone-pad"/>
                        </View>

                        <TextField
                            onChangeText={value => this.handleField(value, 'email', validationPet.email, 'emailError')}
                            onBlur={(value) => this.handleField(value, 'email', validationPet.email, 'emailError')}
                            error={this.state.emailError}
                            labelName="Email"
                            keyboardType="email-address"/>
                    </View>
                    <Map/>
                    <View style={styles.submitContainer}>
                        <Button
                            onPress={this.register}
                            title="Enviar"
                            color= "#1db954"
                            disabled={this.state.isInvalidForm}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerPadding: {
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