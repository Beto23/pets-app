// Dependencies
import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.props.toggle}>
            <Icon
              name="md-menu"
              color="white"
              size={27}
            />
          </TouchableWithoutFeedback>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#fff', fontFamily: 'Roboto' }}>Mascotas</Text>
          {/* <Image style={styles.logo} source={require('../Images/pet.png')} /> */}
          <TouchableWithoutFeedback onPress={this.props.toggleFilter}>
            <Icon
              name="md-funnel"
              color="white"
              size={27}
            />
          </TouchableWithoutFeedback>
        </View>
        {
          this.props.filter ? <View style={styles.containerFilter}>
            <Text>Filtro: {this.props.filter.city.name}, {this.props.filter.state.name} </Text>
            <TouchableWithoutFeedback onPress={this.props.removeFilter}>
              <Icon
                name="md-trash"
                color="#000"
                size={20}
              />
            </TouchableWithoutFeedback>
          </View> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0091EA',
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderColor: "#e0e0e0",
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
  },
  containerFilter: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
});

export default Header;
