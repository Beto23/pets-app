// Dependecies
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class LoginFacebookButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.customStyle]}
        onPress={this.props.handleButton}
      >
        <View style={styles.buttonContainer}>
          <Icon
            name="logo-facebook"
            color="white"
            size={27}
          /> 
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default LoginFacebookButton;
