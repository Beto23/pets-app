// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={{ uri: 'https://i.pinimg.com/originals/3f/3c/d9/3f3cd9f9acd27730ae1e9a3fa315b1f8.png' }} />
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolor doloribus quaerat 
          velit reiciendis, fugiat odio, eum molestiae magnam fugit repellat quam eveniet ipsam nam facere, molestias totam ea vel.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  logo: {
    width: 92,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default About;
