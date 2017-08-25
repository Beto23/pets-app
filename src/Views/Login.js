// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk';

import { Actions } from 'react-native-router-flux';

// Firebase
import firebase, { firebaseAuth } from '../firebase';

const { FacebookAuthProvider } = firebase.auth;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: null,
      isShowLoader: false, 
      isShowButtonNext: false,
      isShowButtonNextWhitout: false,
    };
    console.ignoredYellowBox = ['Setting a timer'];
  }

  componentWillMount() {
    this.authenticateUser();
  }

    authenticateUser = () => {
      AccessToken.getCurrentAccessToken().then((data) => {
        this.setState({ isShowLoader: true });
        if (data) {
          const { accessToken } = data;
          const credential = FacebookAuthProvider.credential(accessToken);
          firebaseAuth.signInWithCredential(credential).then((credentials) => {
            this.setState({
              credentials,
              isShowLoader: false,
              isShowButtonNext: true,
              isShowButtonNextWhitout: false,
            });
            Actions.root({ credentials });
          }).catch((error) => {
            console.log('Sign In Error', error);
          });
        } else {
          this.setState({
            isShowLoader: false,
            isShowButtonNextWhitout: true,
            isShowButtonNext: false,
          });
        }
      });
    }

    handleLoginFinished = (error, result) => {
      this.setState({ isShowButtonNextWhitout: false });
      if (error) {
        console.error(error);
      } else if (result.isCancelled) {
        alert('login is cancelled.');
      } else {
        this.authenticateUser();
      }
    }

    handleButtonPress = () => {
      Actions.root();
    }

    handleLogOut = () => {
      this.setState({
        isShowButtonNext: false,
        isShowButtonNextWhitout: true,
        credentials: null,
      });
    }

    render() {
      const { credentials, isShowButtonNext, isShowButtonNextWhitout } = this.state;
      console.log(credentials);
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../Images/pexels-photo-167085.jpeg')}
          >
            <Text style={styles.welcome}>Adopta una Mascota</Text>
            { this.state.isShowLoader ? <ActivityIndicator /> : null}
            {
              credentials ? null : <LoginButton
                readPermissions={['public_profile', 'email']}
                onLoginFinished={this.handleLoginFinished}
                onLogoutFinished={this.handleLogOut} 
              />
            }
            {credentials ? <View>
              <Text style={styles.name}>{credentials.displayName}</Text>
              <Image style={styles.imageFacebook} source={{ uri: credentials.photoURL }} />
            </View> : null}
            {isShowButtonNextWhitout ? <View style={{ marginTop: 20 }}>
              <Button title='Continuar sin registrarse' onPress={this.handleButtonPress} color="#b7b7b7" />
            </View> : null }

            {isShowButtonNext ? <View style={{ marginTop: 20 }}>
              <Button title='Seguir' onPress={this.handleButtonPress} color="#b7b7b7" />
            </View> : null}
          </Image>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  imageFacebook: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'rgba(165, 165, 165, 0.52)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  whitoutCount: {
    backgroundColor: 'white',
    marginVertical: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

});

export default Login;
