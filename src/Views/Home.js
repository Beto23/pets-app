import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import SideMenu from 'react-native-side-menu';

// Components
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import PetList from './PetsList';
import ModalFilter from '../Components/ModalFilter';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: false,
      isOpenModalFilter: false,
    };
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpenMenu });
  }

  updateMenu(isOpenMenu) {
    this.setState({ isOpenMenu });
  }

  closeMenu = () => {
    this.setState({ isOpenMenu: false });
  }

  handleModalFilter = () => {
    this.setState({ isOpenModalFilter: !this.state.isOpenModalFilter });
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenu
          menu={<Menu closeMenu={this.closeMenu} />}
          isOpen={this.state.isOpenMenu}
          onChange={(isOpen) => this.updateMenu(isOpen)}
        >
          <Header
            toggle={this.handleToggle}
            toggleFilter={this.handleModalFilter}  
          />
          <PetList />
        </SideMenu>
        <ModalFilter 
          isOpenModalFilter={this.state.isOpenModalFilter}
          handleModalFilter={this.handleModalFilter}
        />
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
