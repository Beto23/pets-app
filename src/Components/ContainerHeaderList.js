import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import SideMenu from 'react-native-side-menu';

// Components
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import PetList from '../Views/PetsList';
import ModalFilter from '../Components/ModalFilter';

class ContainerHeaderList extends Component {
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

  componentWillReceiveProps(nextProps) {
    this.setState({ dataList: nextProps.data, orginalData: nextProps.data });
  }

  handleToggle = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
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

  loadHeaderList = () => {
    return (
      <View style={styles.container}>
        <Header
          toggle={this.handleToggle}
          toggleFilter={this.handleShowModalFilter}
          filter={this.state.filters}
          removeFilter={this.removeFilter}
        />
        <PetList data={this.state.dataList} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.isHome ? <SideMenu
            menu={<Menu closeMenu={this.closeMenu} credentials={this.props.credentials} />}
            isOpen={this.state.isOpenMenu}
            onChange={(isOpen) => this.updateMenu(isOpen)}
          >
            {this.loadHeaderList()}
          </SideMenu> : this.loadHeaderList()
        }
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
  },
});

export default ContainerHeaderList;
