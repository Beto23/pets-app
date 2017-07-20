import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SideMenu from 'react-native-side-menu';

//Components
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import PetList from './PetsList';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    console.log(this.state.isOpen);
  }

  handleToggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  updateMenu(isOpen){
    this.setState({isOpen})
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenu
          menu={<Menu/>}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenu(isOpen)}>
          <Header toggle={this.handleToggle} />
          <PetList />
        </SideMenu>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default Home;
