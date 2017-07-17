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

export default class pets extends Component {
  render() {
    return <Router>
        <Scene key="root">
            <Scene key="home" component={Home} hideNavBar />
        </Scene>
      </Router>
  }
}


AppRegistry.registerComponent('pets', () => pets);
