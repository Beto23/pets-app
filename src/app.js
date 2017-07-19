/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//Dependiencies
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';

//Views
import Home from './Views/Home';
import PetList from './Views/PetsList';
import PetDetail from './Views/PetDetail';

export default class pets extends Component {
  render() {
    return <Router>
        <Scene key="root">
            <Scene key="PetList" component={PetList} hideNavBar />
            <Scene key="PetDetail" component={PetDetail} hideNavBar={false} title="Detalle de Mascota"/>            
        </Scene>
      </Router>
  }
}


AppRegistry.registerComponent('pets', () => pets);
