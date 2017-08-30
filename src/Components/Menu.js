// Dependencies
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

// import { LoginButton } from 'react-native-fbsdk';

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

    handleItems = () => {
      const { credentials } = this.props;
      return menuPaths.map(item => {
        if (!item.needLogin) {
          return <ItemBox handleItem={this.handlePath} key={item.id} item={item} />;
        } else if (credentials && item.needLogin) {
          return <ItemBox handleItem={this.handlePath} key={item.id} item={item} />;
        }
        return null;
      });
    }

    render() {
      const { credentials } = this.props;
      console.log(credentials);
      return (
        <View style={styles.menu}>
          {
            credentials ? <View
              style={styles.header}
            >
              <Image
                source={{ uri: credentials.photoURL }}
                style={styles.photo}
              />
              <Text style={{ color: '#fff' }}>{credentials.displayName}</Text>
            </View> : null
          }
          {
            this.handleItems()
          }
          {/* <LoginButton onLogoutFinished={() => Actions.Login()} /> */}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#0091EA',
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginBottom: 5,
  },
});

export default Menu;
