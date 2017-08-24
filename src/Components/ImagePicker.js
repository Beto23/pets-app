// Dependecies
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const ImagePicker = require('react-native-image-picker');

class PhotoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: '',
    };
  }

  error() {
    return this.props.error ? <Text style={styles.error}>{this.props.error}</Text> : null;
  }

    OpenImagePicker = () => {
      const options = {
        title: 'Seleccionar foto',
        storeOptions: {
          cameraRoll: true,
        },
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Tomar Foto...',
        chooseFromLibraryButtonTitle: 'Elegir de galeria',
        mediaType: 'photo',
      };
      ImagePicker.showImagePicker(options, (response) => {
        if (response.uri) {
          this.props.handlePhotoUri(response.uri);
          this.setState({ imagePath: response.uri });
        }
      });
    }

    render() {
      const { imagePath } = this.state;
      return (
        <View style={styles.container}>
          {imagePath ? <Image style={styles.image} source={{ uri: imagePath }} /> : null}
          <View style={styles.button}>
            <Icon name="md-camera" size={30} color="#000" />
            <Button
              onPress={this.OpenImagePicker}
              title="Tomar Foto"
              color="#2196F3"
            />
          </View>
          {this.error()}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  container: {
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
  },
  error: {
    color: 'red',
  },
});

export default PhotoPicker;
