//Dependecies
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

var ImagePicker = require('react-native-image-picker');


class PhotoPicker extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            imagePath: '',
            imageHeight: '',
            imageWidth: ''
        }
    }

    OpenImagePicker = () => {
        const options = {
            title: 'Seleccionar foto',
            storeOptions: {
                cameraRoll: true
            },
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Tomar Foto...',
            chooseFromLibraryButtonTitle: 'Elegir de galeria',
            mediaType: 'photo'
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {;
                this.setState({
                    imagePath: response.uri,
                    imageHeight: response.height,
                    imageWidth: response.width
                });
            }
        });
    }

    render() {
        const { imagePath } = this.state;
        return(
            <View style={styles.container}>
                {imagePath ? <Image style={styles.image} source={{uri: imagePath}}/> : null}
                <View style={styles.button}>
                    <Button
                        onPress={this.OpenImagePicker}
                        title="Tomar Foto"
                        color= "#2196F3"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 100,
        width: 150,
        height: 150
    },
    container: {
        alignItems: 'center',
        marginBottom: 15
    },
    button: {
        marginTop: 15
    }
});

export default PhotoPicker;