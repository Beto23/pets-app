//Dependencies
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import FBSDK, {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk';

import { Actions } from "react-native-router-flux";

// Firebase
import firebase, { firebaseAuth } from '../firebase';

const { FacebookAuthProvider } = firebase.auth;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            credentials: null
        }
        console.ignoredYellowBox = ['Setting a timer'];
    }

    componentWillMount() {
        this.authenticateUser();
    }

    authenticateUser = () => {
        AccessToken.getCurrentAccessToken().then((data) => {
            if (data) {
                // console.log(data, 'data');
                const { accessToken } = data;
                const credential = FacebookAuthProvider.credential(accessToken);
                firebaseAuth.signInWithCredential(credential).then((credentials) => {
                    this.setState({ credentials, isLogged: true });
                    Actions.root({credentials});
                }).catch( (error) => {
                    console.log("Sign In Error", error);
                });
            } else {
                if(this.state.isLogged) this.setState({ isLogged: false });
            }
        });
    }

    handleLoginFinished = (error, result) => {
        if (error) {
            console.error(error);
        } else if (result.isCancelled) {
            alert("login is cancelled.");
        } else {
            this.authenticateUser();
        }
    }

    handleButtonPress = () => {
        Actions.root()
    }

    handleLogOut = () => {
        this.setState({
            isLogged:false,
            credentials: null
        });
    }

    render(){
        const { isLogged, credentials } = this.state;
        return(
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../Images/pexels-photo-167085.jpeg')}>
                    <Text style={styles.welcome}>Adopta una Mascota</Text>
                    <LoginButton
                        readPermissions={["public_profile", "email"]}
                        onLoginFinished={this.handleLoginFinished}
                        onLogoutFinished={this.handleLogOut}/>
                    {credentials ? <Text>{credentials.displayName}</Text> : null}
                    {isLogged ? null: <TouchableHighlight
                        style={styles.whitoutCount}
                        onPress={this.handleButtonPress}>
                        <Text>Continuar sin registrarse</Text>
                    </TouchableHighlight> }
                    {isLogged ? <TouchableHighlight
                        onPress={this.handleButtonPress}
                        title="Seguir"
                        style={styles.button}> 
                        <Text>Seguir</Text> 
                    </TouchableHighlight> : null}
                </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    welcome: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20
    },
    button: {
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15
    },
    whitoutCount: {
        backgroundColor: 'white',
        marginVertical: 16,
        paddingHorizontal: 10,
        paddingVertical: 5
    }

});

export default Login;