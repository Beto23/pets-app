// Dependencies
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

import { firebaseAuth } from '../firebase';

// Components
import ItemBox from './ItemBox';
import LogOut from './ButtonLoginFacebook';

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
        case 4:
          Actions.About();
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
        } else if (credentials && item.needLogin && item.isButtonFace) {
          return (
            <LogOut
              customStyle={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
              key={item.id}
              text={item.name}
              handleButton={this.handleFacebookLogout}
            />
          );
        } else if (credentials && item.needLogin) {
          return <ItemBox handleItem={this.handlePath} key={item.id} item={item} />;
        }
        return null;
      });
    }

    handleFacebookLogout() {
      LoginManager.logOut();
      Actions.Login();
      firebaseAuth.app.auth().signOut();
      AsyncStorage.removeItem('credentials');
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
            </View> : <View
              style={styles.header}
            >
              <Image
                source={{ uri: 'https://i.pinimg.com/originals/3f/3c/d9/3f3cd9f9acd27730ae1e9a3fa315b1f8.png' }}
                style={{ width: 70, height: 90 }}
              />
            </View>
          }
          {
            this.handleItems()
          }
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
