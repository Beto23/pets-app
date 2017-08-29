import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import { firebaseDataBase } from '../firebase';

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
      dataList: [],
      dataListFilter: [],
      orginalData: [],
      filters: null,
    };
  }

  componentDidMount() {
    const pets = firebaseDataBase.ref('pet');
    pets.on('value', snapshot => {
      const data = snapshot.val();
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj._key = key;
        return obj;
      });
      this.setState({ dataList: dataWithKeys, orginalData: dataWithKeys });
    });
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

  handleShowModalFilter = () => {
    this.setState({ isOpenModalFilter: !this.state.isOpenModalFilter });
  }

  handleFilter = (state, city) => {
    const filter = this.state.orginalData.filter(f => f.state.id === state.id && f.city.id === city.id);
    this.setState({
      dataList: filter,
      filters: {
        city,
        state,
      },
    });
    this.handleShowModalFilter();
  }

  removeFilter = () => {
    this.setState({
      dataList: this.state.orginalData,
      filters: null,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SideMenu
          menu={<Menu closeMenu={this.closeMenu} credentials={this.props.credentials} />}
          isOpen={this.state.isOpenMenu}
          onChange={(isOpen) => this.updateMenu(isOpen)}
        >
          <Header
            toggle={this.handleToggle}
            toggleFilter={this.handleShowModalFilter}
            filter={this.state.filters}
            removeFilter={this.removeFilter}
          />
          <PetList data={this.state.dataList} />
        </SideMenu>
        <ModalFilter 
          isOpenModalFilter={this.state.isOpenModalFilter}
          handleModalFilter={this.handleShowModalFilter}
          handleFilter={this.handleFilter}
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
