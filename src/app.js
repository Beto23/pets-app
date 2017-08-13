/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//Dependiencies
import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

//Views
import Login from './Views/Login';
import Home from './Views/Home';
import PetList from './Views/PetsList';
import PetDetail from './Views/PetDetail';
import PetsLostsList from './Views/PetsLostsList';
import PetLostDetail from './Views/PetLostDetail';
import PetAdd from './Views/PetAdd';

export default class pets extends Component {

  render() {
    return <Router>
        <Scene key="Login" component={Login} hideNavBar />        
        <Scene key="root">
            <Scene key="Home" component={Home} hideNavBar />
            <Scene key="PetList" component={PetList} hideNavBar />
            <Scene
              key="PetDetail"
              component={PetDetail}
              hideNavBar={false}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navBarTitle}
              leftButtonIconStyle={styles.barButtonIconStyle}/>
            <Scene key="PetsLostsList" component={PetsLostsList} hideNavBar={false} title="Mascotas Perdidas"/>
            <Scene key="PetLostDetail" component={PetLostDetail} hideNavBar={false} title="Detalle de Mascota"/>  
            <Scene key="PetAdd" component={PetAdd} hideNavBar={false} title="Agregar Mascota"/>            
                      
        </Scene>
      </Router>
  }
}

const styles = StyleSheet.create({
  navBar: {
      backgroundColor:'transparent',
  },
  navBarTitle:{
      color:'gray'
  },
  titleStyle:{
      color:'gray'
  },
  barButtonIconStyle:{
      tintColor:'white'
  },
});


AppRegistry.registerComponent('pets', () => pets);
