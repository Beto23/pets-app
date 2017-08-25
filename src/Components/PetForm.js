// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import Orientation from 'react-native-orientation';
import { firebaseStorage, firebaseDataBase, firebaseAuth } from '../firebase';

// Components
import PhotoPicker from './ImagePicker';
import Map from './Map';
import TextField from './TextField';
import validationPet from '../shared/petValidation';
import validate from '../shared/validationWrapper';
import PickerField from './PickerField';
import PickerFieldV2 from './pickerFieldV2';
import MyDatePicker from './DatePicker';

// Helper
import { HelperFormAdd } from '../shared/HelperFormAdd';
import { species, breedDog, breedCat, genderPet, sizePet, agePet } from '../shared/itemsArraysForm';

import {
  fieldName,
  fieldSpecie,
  fieldSize,
  fieldAge,
  fieldGender,
  fieldDescription,
  fieldNameContact,
  fieldPhone,
  fieldEmail,
  fieldPhoto,
  fieldNeighborhood,
  fieldStreet,
} from '../shared/fieldsAddPet';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => new Promise((resolve, reject) => {
  const uploadUri = Platform.OS === 'ios' ? uri.reaplace('file//', '') : uri;
  let uploadBlob = null;
  const imageRef = firebaseStorage.ref('images').child(imageName);
  fs.readFile(uploadUri, 'base64')
    .then(data => Blob.build(data, { type: `${mime};BASE64` }))
    .then(blob => {
      uploadBlob = blob;
      return imageRef.put(blob, { contentType: mime });
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
    });
});

const { width } = Dimensions.get('window');
const widthRow = ((width / 2) - 15);

class PetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      size: sizePet[0].name,
      specie: species[0].name,
      breed: breedDog[1].name,
      age: agePet[0].name,
      gender: genderPet[0].name,
      description: '',
      nameContact: '',
      phone: null,
      email: '',
      imagePath: '',
      state: {
        name: '',
        id: '',
      },
      states: '',
      city: {
        name: '',
        city_id: '',
      },
      cities: '',
      uid: '',
      date: '',
      neighborhood: '',
      street: '',
      isButtonDisabled: false,
      isShowLoader: false,
    };
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    this.setCurrentUser();
    this.fillStateCity();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

    getCities = (stateId) => {
      const citiesRef = firebaseDataBase.ref(`cities/mx/${stateId}`);
      citiesRef.once('value', snapshot => {
        const data = this.objectToArray(snapshot.val());
        this.setState({
          cities: data,
          city: {
            name: data[0].name,
            city_id: data[0].id,
          },
        });
      });
    }

    async setCurrentUser() {
      try {
        const user = await firebaseAuth.currentUser;
        this.setState({
          uid: user.uid,
        });
      } catch (error) {
        console.log(error);
      }
    }
  
    setForm = () => {
      const { isLostPet } = this.props;
      try {
        if (this.state.uid) {
          this.setState({ isShowLoader: true });
          const { name, specie, size, imagePath, breed, age, gender, street, neighborhood, state, city,
            description, nameContact, phone, email, date, uid, region } = this.state;
          const item = { name, specie, size, breed, age, gender, state, city, description, nameContact, phone, email, date, uid };
          if (isLostPet) {
            item.street = street;
            item.neighborhood = neighborhood;
            item.region = region;
          }
          uploadImage(imagePath, `${name}${this.state.uid}.jpg`)
            .then((responseData) => {
              item.imagePath = responseData;
            })
            .then(() => {
              if (isLostPet) {
                HelperFormAdd.addLostPet(item);
                this.setState({ isShowLoader: false });
                Actions.PetsLostsList();                
              } else {
                HelperFormAdd.addPet(item);
                this.setState({ isShowLoader: false });
                Actions.Home();
              }
            })
            .done();
        }
      } catch (error) {
        console.log(error);
      }
    }

    handleField = (value, fieldNameForm, validation, error) => {
      /*
            new object is crated whit key and value of the field to set in the state
            ej const fomr = {}; 
            form: {email: 'email@example.com'}
        */
      const fielfValue = {};
      fielfValue[fieldNameForm] = value;
      this.setState(fielfValue);
      /*
            new object is crated whit key and value of the error to set in the state
            ej const error = {}; 
            form: {errorEmail: 'email is required'}
        */
      const typeError = {};
      typeError[error] = validate(fieldNameForm, value, validation);
      this.setState(typeError);
    }

    handleMap = (lat, lng, latDelta, lngDelta) => {
      this.setState({
        region: {
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        },
      });
    }

    register = () => {
      this.setState({ isButtonDisabled: true });              
      const nameError = validate(fieldName.nameField, this.state.name, fieldName.validation);
      const specieError = validate(fieldSpecie.nameField, this.state.specie, fieldSpecie.validation);
      const sizeError = validate(fieldSize.nameField, this.state.specie, fieldSize.validation);                        
      const photoError = validate(fieldPhoto.nameField, this.state.imagePath, fieldPhoto.validation);                
      // const breedError = validate(fieldBreed.nameField, this.state.breed, fieldBreed.validation);        
      const ageError = validate(fieldAge.nameField, this.state.age, fieldAge.validation);        
      const genderError = validate(fieldGender.nameField, this.state.gender, fieldGender.validation);        
      const descriptionError = validate(fieldDescription.nameField, this.state.description, fieldDescription.validation);        
      const nameContactError = validate(fieldNameContact.nameField, this.state.nameContact, fieldNameContact.validation);        
      const phoneError = validate(fieldPhone.nameField, this.state.phone, fieldPhone.validation);        
      const emailError = validate(fieldEmail.nameField, this.state.email, fieldEmail.validation);
      const streetError = validate(fieldStreet.nameField, this.state.street, fieldStreet.validation);
      const neighborhoodError = validate(fieldNeighborhood.nameField, this.state.neighborhood, fieldNeighborhood.validation);      

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
        photoError,
        streetError,
        neighborhoodError,
      });

      if (!nameError && !photoError && !ageError && !sizeError && !genderError && 
          !descriptionError && !nameContactError && !phoneError && !emailError && !specieError && !neighborhoodError && !streetError) {
        this.setForm();
      } else {
        this.setState({ isButtonDisabled: false });
        console.log('form invalido');
      }
    }
  
    fillStateCity = () => {
      const statesMex = firebaseDataBase.ref('states/mx');
      statesMex.once('value', snapshot => {
        const data = this.objectToArray(snapshot.val());
        this.setState({ states: data });
      });
    }
  
    objectToArray(snapshotValue) {
      const data = snapshotValue;
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj.id = key;
        return obj;
      });
      return dataWithKeys;
    }
  
    handleSelectState = (state) => {
      firebaseDataBase.ref(`states/mx/${state}`)
        .once('value', snapshot => {
          this.setState({
            state: {
              name: snapshot.val().name,
              id: state,
            },
          });
        })
        .then(() => this.getCities(state));
    }

    handleSelectCity = (city) => {
      firebaseDataBase.ref(`cities/mx/${this.state.state.id}/${city}`)
        .once('value', snapshot => {
          this.setState({
            city: {
              name: snapshot.val().name,
              id: city,
            },
          });
        });
    }

    handleSpecieBreed = () => {
      if (this.state.specie === species[0].name) {
        return breedDog;
      } else if (this.state.specie === species[1].name) {
        return breedCat;
      }
    }

    handlePhotoUri = (uri) => {
      if (uri) {
        this.setState({ imagePath: uri });
      }
    }
    render() {
      const { isLostPet } = this.props;
      return (
        <View>
          <View style={styles.container}>
            <PhotoPicker
              handlePhotoUri={this.handlePhotoUri}
              error={this.state.photoError}
            /> 
            <View style={styles.containerPadding}>
              <TextField
                onChangeText={value => this.handleField(value, 'name', validationPet.name, 'nameError')}
                onBlur={(value) => this.handleField(value, 'name', validationPet.name, 'nameError')}
                error={this.state.nameError}
                labelName="Nombre"
              />
              <View style={styles.row}>
                <PickerField
                  selectedValue={this.state.specie}
                  onValueChange={(itemValue) => this.handleField(itemValue, 'specie', validationPet.name, 'specieError')}
                  width={widthRow}
                  error={this.state.specieError}
                  label="Especie"
                  items={species}
                />
                <PickerField
                  selectedValue={this.state.breed}
                  onValueChange={(itemValue) => this.setState({ breed: itemValue })}
                  width={widthRow}
                  error=""
                  label="Raza"
                  items={this.handleSpecieBreed()}
                />
              </View>    

              <View style={styles.row}>
                <PickerField
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue) => this.handleField(itemValue, 'gender', validationPet.name, 'genderError')}
                  width={widthRow}
                  error={this.state.specieError}
                  label="Género"
                  items={genderPet}
                />
                <PickerField
                  selectedValue={this.state.age}
                  onValueChange={(itemValue) => this.handleField(itemValue, 'age', validationPet.name, 'ageError')}
                  width={widthRow}
                  error={this.state.ageError}
                  label="Edad"
                  items={agePet}
                />
              </View>
              <View style={styles.row}>
                <PickerField
                  selectedValue={this.state.size}
                  onValueChange={(itemValue) => this.handleField(itemValue, 'size', validationPet.name, 'sizeError')}
                  width={widthRow}
                  error={this.state.sizeError}
                  label="Tamaño"
                  items={sizePet}
                />
                <MyDatePicker
                  handleDate={(date) => this.setState({ date })}
                  width={widthRow}
                />
              </View> 
              <TextField
                onChangeText={value => this.handleField(value, 'description', validationPet.name, 'descriptionError')}
                onBlur={(value) => this.handleField(value, 'description', validationPet.name, 'descriptionError')}
                error={this.state.descriptionError}
                labelName="Descripcion"
                multiline
                height={100}
              /> 
            </View>
            {/* Seccion de ubicacion  */}
            <View>
              <Text style={{ marginBottom: 10, paddingHorizontal: 10 }}>
                {isLostPet ? 'Lugar de perdida' : 'Ubicación'}  
              </Text>               
              <View style={[styles.row, styles.containerPadding]}>
                <PickerFieldV2
                  selectedValue={this.state.state.id}
                  onValueChange={(itemValue) => this.handleSelectState(itemValue)}
                  width={widthRow}
                  label="Estado"
                  items={this.state.states}
                />
                <PickerFieldV2
                  selectedValue={this.state.city.id}
                  onValueChange={(itemValue) => this.handleSelectCity(itemValue)}
                  width={widthRow}
                  label="Ciudad"
                  items={this.state.cities}
                />
              </View>

              {
                isLostPet ? <View>
                  <View style={[styles.row, styles.containerPadding]}>
                    <TextField
                      onChangeText={value => this.handleField(value,
                        fieldNeighborhood.nameField, fieldNeighborhood.validation, fieldNeighborhood.nameError)}
                      onBlur={(value) => this.handleField(value, fieldNeighborhood.nameField,
                        fieldNeighborhood.validation, fieldNeighborhood.nameError)}
                      error={this.state.neighborhoodError}
                      labelName="Direccion"
                      width={widthRow}
                    />
                    <TextField
                      onChangeText={value => this.handleField(value, fieldStreet.nameField, validationPet.name, fieldStreet.nameError)}
                      onBlur={(value) => this.handleField(value, fieldStreet.nameField, validationPet.name, fieldStreet.nameError)}
                      error={this.state.streettError}
                      labelName="Calle"
                      width={widthRow}
                    />
                  </View>
                  <Map
                    handleMap={this.handleMap}
                    street={this.state.street}
                    neighborhood={this.state.neighborhood}
                    state={this.state.state.name}
                    city={this.state.city.name}
                  />
                </View> : null
              }
            </View>
            {/* Seccion de Contacto  */}
            <View style={styles.containerPadding}>
              <Text style={{ marginBottom: 10 }}>Contacto</Text>
              <View style={styles.row}>
                <TextField
                  onChangeText={value => this.handleField(value, 'nameContact', validationPet.name, 'nameContactError')}
                  onBlur={(value) => this.handleField(value, 'nameContact', validationPet.name, 'nameContactError')}
                  error={this.state.nameContactError}
                  labelName="Nombre"
                  width={widthRow}
                />
                <TextField
                  onChangeText={value => this.handleField(value, 'phone', validationPet.name, 'phoneError')}
                  onBlur={(value) => this.handleField(value, 'phone', validationPet.name, 'phoneError')}
                  error={this.state.phoneError}
                  labelName="Telefono"
                  width={widthRow}
                  keyboardType="phone-pad"
                />
              </View>

              <TextField
                onChangeText={value => this.handleField(value, 'email', validationPet.email, 'emailError')}
                onBlur={(value) => this.handleField(value, 'email', validationPet.email, 'emailError')}
                error={this.state.emailError}
                labelName="Email"
                keyboardType="email-address"
              />
            </View>
            {
              this.setState.isShowLoader ? <View style={{ alignItems: 'center' }}>
                <ActivityIndicator />
                <Text>
                  Enviando...
                </Text>
              </View> : null
            }
            <View style={styles.submitContainer}>
              <Button
                onPress={this.register}
                title="Enviar"
                color="#1db954"
                disabled={this.state.isButtonDisabled}
              />
            </View>
          </View>
        </View>
      );
    }
}

PetForm.defaultProps = {
  isLostPet: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPadding: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputRow: {
    width: 15,
    backgroundColor: 'red',
  },
  submitContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
});

export default PetForm;
