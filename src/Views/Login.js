// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import {
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk';

import { Actions } from 'react-native-router-flux';

// Firebase
import firebase, { firebaseAuth } from '../firebase';

// const connectionRef = firebaseDataBase.ref('.ifo/connected');
const { FacebookAuthProvider } = firebase.auth;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: null,
      isShowLoader: false,
    };
    console.ignoredYellowBox = ['Setting a timer'];
  }

  componentWillMount() {
    // AsyncStorage.removeItem('credentials');
    AsyncStorage.getItem('credentials')
      .then(credentialsJson => {
        const credentials = JSON.parse(credentialsJson);
        this.setState({ credentials });
      })
      .then(() => {
        this.authenticateUser();
      })
      .catch(error => console.log(error));
  }

  // componentDidMount() {
  //   connectionRef.on('value', snap => {
  //     console.log('connection', snap.val());
  //   });
  // }

    authenticateUser = () => {
      AccessToken.getCurrentAccessToken().then((data) => {
        if (data) {
          this.setState({ isShowLoader: true });
          if (!this.state.credentials) {
            const { accessToken } = data;
            const credential = FacebookAuthProvider.credential(accessToken);
            firebaseAuth.signInWithCredential(credential).then((credentials) => {
              this.handleSuccessCredentials(credentials);
              AsyncStorage.setItem('credentials', JSON.stringify(credentials));
            }).catch((error) => {
              console.log('Sign In Error', error);
            });
          } else {
            const { credentials } = this.state;
            this.handleSuccessCredentials(credentials); 
          }
        }
      });
    }

    handleSuccessCredentials = (credentials) => {
      this.setState({
        credentials,
        isShowLoader: false,
      });
      Actions.root({ credentials });
    }

    handleButtonPress = () => {
      Actions.root();
    }

    handleLogOut = () => {
      firebaseAuth.app.auth().signOut();
      AsyncStorage.removeItem('credentials');
      this.setState({
        isShowLoader: false,
        credentials: null,
      });
    }

    handleFacebookLogin = () => {
      LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
          if (result.isCancelled) {
            alert('login is cancelled.');
          } else {
            this.authenticateUser();
          }
        });
    }

    handleFacebookLogout = () => {
      LoginManager.logOut();
      this.handleLogOut();
    }

    render() {
      const { credentials } = this.state;
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../Images/pexels-photo-167085.jpeg')}
          >
            <Text style={styles.welcome}>Adopta una Mascota</Text>
            { this.state.isShowLoader ? <ActivityIndicator style={{ margin: 10 }} /> : null}
            {credentials ? <View>
              <Text style={styles.name}>{credentials.displayName}</Text>
              <Image style={styles.imageFacebook} source={{ uri: credentials.photoURL }} />
            </View> : null}
            <View style={{ margin: 20 }}>
              <Button title={credentials ? 'Seguir' : 'Continuar sin registrarse'} onPress={this.handleButtonPress} color="#b7b7b7" />
            </View>
            {
              credentials ? <Button
                onPress={this.handleFacebookLogout}
                title='cerrar sesion'
              /> : <Button
                onPress={this.handleFacebookLogin}
                title='iniciar con facebook'
              />
            }
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
