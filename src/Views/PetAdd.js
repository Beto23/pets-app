//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

//Components
import PhotoPicker from '../Components/ImagePicker';
import Map from '../Components/Map';

class PetAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            breed: '',
            gender: '',
            age: '',
            description: '',
            city: '',
            country: '',
            nameContac: '',
            email: '',
            phone: '',
        } 
    }

    changeName(name) {
        this.setState({name:name});
    }

    changeBreed(breed) {
        this.setState({breed:breed});
    }

    changeGender = (gender) => {
        this.setState({gender});
    }

    changeAge(age) {
        this.setState({age});
    }

    changeContacName(nameContac) {
        this.setState({nameContac});
    }

    changeContacEmail(email) {
        this.setState({email});
        if(!this.validateEmail(this.state.email)) {
            console.log('not valid email');
        } else {
            console.log('valid email');
        }
    }

    validateEmail(email){
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    changeContacPhone(phone) {
        this.setState({phone});
    }

    changeDescription(description) {
        this.setState({description});
    }

    
    handleSend = () => {
        console.log(this.state, 'state')
        const { name, breed, gender, age, description, nameContac, email, phone  } = this.state;
        if(name && breed && gender && age && description && nameContac && email && phone) {
            console.warn('Valido');            
        } else {
            console.warn('Invalido');
        }
    }


    render() {
        console.log(this.state);
        return(
            <ScrollView>
                <View style={styles.container}>
                    <PhotoPicker />
                    <TextInput
                        value = {this.state.name}
                        onChangeText = {(name) => this.changeName(name)}
                        placeholder="Nombre"
                        maxLength={15}
                    />
                    <TextInput
                        value = {this.state.breed}
                        onChangeText = {(breed) => this.changeBreed(breed)}
                        placeholder="Raza"
                        maxLength={15}
                    />
                    <TextInput
                        value = {this.state.description}
                        onChangeText = {(description) => this.changeDescription(description)}
                        placeholder="description"
                        maxLength={150}
                        multiline={true}
                    />
                    <Picker
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) => this.changeGender(itemValue)}>
                        <Picker.Item label="Macho" value="Macho"/>
                        <Picker.Item label="Hembra" value="Hembra"/>
                    </Picker>
                    <Picker
                        selectedValue={this.state.age}
                        onValueChange={(itemValue, itemIndex) => this.changeAge(itemValue)}>
                        <Picker.Item label="Cachorro" value="Cachorro"/>
                        <Picker.Item label="Joven" value="Joven" />
                        <Picker.Item label="Adulto" value="Adulto"/>                    
                    </Picker>
                    <Map /> 
                    <Text>Contactoo</Text>
                    <TextInput
                        value = {this.state.nameContac}
                        onChangeText = {(nameContac) => this.changeContacName(nameContac)}
                        placeholder="Nombre"
                        maxLength={15}
                    />
                    <TextInput
                        value = {this.state.email}
                        onChangeText = {(email) => this.changeContacEmail(email)}
                        placeholder="Email"
                        maxLength={15}
                        keyboardType="email-address"
                    />
                    <TextInput
                        value = {this.state.phone}
                        onChangeText = {(phone) => this.changeContacPhone(phone)}
                        placeholder="Telefono"
                        maxLength={15}
                    />
                </View>
                <TouchableHighlight onPress={this.handleSend}>
                    <Text>Enviar</Text>
                </TouchableHighlight>
            </ScrollView>
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