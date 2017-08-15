//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { Actions } from "react-native-router-flux";
import RNFetchBlob from 'react-native-fetch-blob';
import { firebaseStorage } from '../firebase';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.reaplace('file//', '') : uri;
        let uploadBlob = null;
        const imageRef = firebaseStorage.ref('images').child(imageName);
        fs.readFile(uploadUri, 'base64')
            .then(data => {
                return Blob.build(data, {type: `${mime};BASE64`})
            })
            .then( blob => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime})
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then(url => {
                resolve(url);
            })
            .catch(error => {
                reject(error);
            })
    })
}

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
import { species, breedDog, breedCat, genderPet, size, agePet } from '../shared/itemsArraysForm';

import {
    fieldName,
    fieldSpecie,
    fieldSize,
    fieldBreed,
    fieldAge,
    fieldGender,
    fieldDescription,
    fieldNameContact,
    fieldPhone,
    fieldEmail,
    fieldPhoto
} from '../shared/fieldsAddPet';
import { firebaseAuth } from '../firebase';

class PetForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            size: size[0].name,
            specie: species[0].name,
            breed: breedDog[1].name,
            age: agePet[0].name,
            gender: genderPet[0].name,
            description: '',
            nameContact: '',
            phone: null,
            email: '',
            imagePath: '',
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
        const specieError = validate(fieldSpecie.nameField, this.state.specie, fieldSpecie.validation);
        const sizeError = validate(fieldSize.nameField, this.state.specie, fieldSize.validation);                        
        const photoError = validate(fieldPhoto.nameField, this.state.imagePath, fieldPhoto.validation);                
        // const breedError = validate(fieldBreed.nameField, this.state.breed, fieldBreed.validation);        
        const ageError = validate(fieldAge.nameField, this.state.age, fieldAge.validation);        
        const genderError = validate(fieldGender.nameField, this.state.gender, fieldGender.validation);        
        const descriptionError = validate(fieldGender.nameField, this.state.description, fieldGender.validation);        
        const nameContactError = validate(fieldNameContact.nameField, this.state.nameContact, fieldNameContact.validation);        
        const phoneError = validate(fieldPhone.nameField, this.state.phone, fieldPhone.validation);        
        const emailError = validate(fieldEmail.nameField, this.state.email, fieldEmail.validation);

        this.setState({
            nameError,
            specieError,
            sizeError,
            ageError,
            genderError,
            descriptionError,
            nameContactError,
            phoneError,
            emailError,
            photoError
        });

        if (!nameError && !photoError && !ageError && !sizeError && !genderError && !descriptionError && !nameContactError && !phoneError && !emailError && !specieError) {
            this.setForm();
        } else {
            console.log('form invalido');
        }
    }

    setForm = () => {
        try {
            if (this.state.uid) {
                const { name, specie, size, imagePath, breed, age, gender, description, nameContact, phone, email, uid } = this.state;
                const item = {name, specie, size, breed, age, gender, description, nameContact, phone, email, uid}
                uploadImage(imagePath, `${name}${this.state.uid}.jpg`)
                    .then((responseData) => {
                        item.imagePath = responseData;
                    })
                    .then(() => {
                        HelperFormAdd.addPet(item);
                        console.log('Enviado......');
                        Actions.Home();
                    })
                    .done()
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleSpecieBreed = () => {
        if(this.state.specie === species[0].name) {
            return breedDog;
        } else if(this.state.specie === species[1].name) {
            return breedCat;
        } else {
            return null;
        }
    }

    handlePhotoUri = (uri) => {
        uri ? this.setState({imagePath: uri}): null;
    }


    render() {
        return(
            <View>
                <View style={styles.container}>
                    <PhotoPicker
                        handlePhotoUri={this.handlePhotoUri}
                        error={this.state.photoError} /> 
                    <View style={styles.containerPadding}>
                            <TextField
                                onChangeText={value => this.handleField(value, 'name', validationPet.name, 'nameError')}
                                onBlur={(value) => this.handleField(value, 'name', validationPet.name, 'nameError')}
                                error={this.state.nameError}
                                labelName="Nombre"/>
                        <View style={styles.row}>
                            <PickerField
                                selectedValue={this.state.specie}
                                onValueChange={(itemValue, itemIndex) => this.handleField(itemValue, 'specie', validationPet.name, 'specieError')}
                                width={widthRow}
                                error={this.state.specieError}
                                label="Especie"
                                items={species}/>
                            <PickerField
                                selectedValue={this.state.breed}
                                onValueChange={(itemValue, itemIndex) => this.setState({breed: itemValue})}
                                width={widthRow}
                                error=""
                                label="Raza"
                                items={this.handleSpecieBreed()}/>
                        </View>

                        <View style={styles.row}>
                            <PickerField
                                selectedValue={this.state.gender}
                                onValueChange={(itemValue, itemIndex) => this.handleField(itemValue, 'gender', validationPet.name, 'genderError')}
                                width={widthRow}
                                error={this.state.specieError}
                                label="Género"
                                items={genderPet}/>
                            <PickerField
                                selectedValue={this.state.age}
                                onValueChange={(itemValue, itemIndex) => this.handleField(itemValue, 'age', validationPet.name, 'ageError')}
                                width={widthRow}
                                error={this.state.ageError}
                                label="Edad"
                                items={agePet}/>
                        </View>
                        <View style={styles.row}>
                            <PickerField
                                selectedValue={this.state.size}
                                onValueChange={(itemValue, itemIndex) => this.handleField(itemValue, 'size', validationPet.name, 'sizeError')}
                                width={widthRow}
                                error={this.state.sizeError}
                                label="Tamaño"
                                items={size}/>
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
                                labelName="Nombre"
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