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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    handleLoginFiniched = (error, result) => {
        console.log('sdfsd')
        if (error) {
            console.error(error);
        } else if (result.isCancelled) {
            alert("login is cancelled.");
        } else {
            AccessToken.getCurrentAccessToken().then(() => {
                Actions.root();
                this.setState({isLogged: true});
            });
        }
    }

    componentDidMount() {
        FBSDK.AccessToken.getCurrentAccessToken().then(
            (data) => {
                if(data){
                    Actions.root();
                    this.setState({isLogged: true});
                }
                data ? Actions.root() : null;
            }
        )
    }

    handleButtonPress = () => {
        Actions.root()
    }

    render(){
        const { isLogged } = this.state;
        return(
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../Images/pexels-photo-167085.jpeg')}>
                    <Text style={styles.welcome}>Adopta una Mascota</Text>
                    <LoginButton
                    readPermissions={["public_profile", "email"]}
                    onLoginFinished={this.handleLoginFiniched}
                    onLogoutFinished={() => this.setState({isLogged:false})}/>
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