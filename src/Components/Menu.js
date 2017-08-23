// Dependencies
import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import { LoginButton } from 'react-native-fbsdk';

import { Actions } from 'react-native-router-flux';

// Components
import ItemBox from './ItemBox';

// paths
import { menuPaths } from '../menuPaths';

// const { width, height } = Dimensions.get(window);

class Menu extends Component {
    handlePath = (item) => {
      switch (item.id) {
        case 1:
          Actions.PetAdd();            
          break;
        case 2:
          Actions.PetsLostsList();
          break;
        case 3:
          Actions.PetLostAdd();
          break;
        default:
          break;
      }
      this.props.closeMenu();
    }

    render() {
      return (
        <View style={styles.menu}>
          {
            menuPaths.map(path => <ItemBox handleItem={this.handlePath} key={path.id} item={path} />)
          }
          <LoginButton onLogoutFinished={() => Actions.Login()} />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Menu;
