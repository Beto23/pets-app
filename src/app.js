/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// Dependiencies
import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

// Views
import Login from './Views/Login';
import Home from './Views/Home';
import PetList from './Views/PetsList';
import PetDetail from './Views/PetDetail';
import PetsLostsList from './Views/PetsLostsList';
import PetLostDetail from './Views/PetLostDetail';
import PetAdd from './Views/PetAdd';
import PetLostAdd from './Views/PetLostAdd';
import About from './Views/About';

export default class pets extends Component {
  render() {
    return (
      <Router>
        <Scene key="Login" component={Login} hideNavBar />        
        <Scene key="root">
          <Scene key="Home" component={Home} hideNavBar />
          <Scene
            key="About"
            component={About}
            hideNavBar={false}
            title="Acerca de"
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
            leftButtonIconStyle={styles.barButtonIconStyle}
          />
          <Scene key="PetList" component={PetList} hideNavBar />
          <Scene
            key="PetDetail"
            component={PetDetail}
            hideNavBar={false}
            navigationBarStyle={styles.navBarDetail}
            titleStyle={styles.navBarTitle}
            leftButtonIconStyle={styles.barButtonIconStyle}
          />
          <Scene
            key="PetsLostsList"
            component={PetsLostsList}
            hideNavBar
            title="Mascotas Perdidas"
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
            leftButtonIconStyle={styles.barButtonIconStyle}
          />
          <Scene key="PetLostDetail" component={PetLostDetail} hideNavBar={false} title="Detalle de Mascota" />  
          <Scene
            titleStyle={styles.navBarTitle}
            leftButtonIconStyle={styles.barButtonIconStyle}
            navigationBarStyle={styles.navBar}
            key="PetAdd"
            component={PetAdd}
            hideNavBar={false}
            title="Agregar Mascota"
          />
          <Scene
            titleStyle={styles.navBarTitle}
            leftButtonIconStyle={styles.barButtonIconStyle}
            navigationBarStyle={styles.navBar}
            key="PetLostAdd"
            component={PetLostAdd}
            hideNavBar={false}
            title="Mascota Perdida"
          />            
                      
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#0091EA',
  },
  navBarDetail: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  navBarTitle: {
    color: 'white',
  },
  titleStyle: {
    color: 'white',
  },
  barButtonIconStyle: {
    tintColor: 'white',
  },
});

AppRegistry.registerComponent('pets', () => pets);
