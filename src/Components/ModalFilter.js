// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseDataBase } from '../firebase';

// Components
import Picker from '../Components/pickerFieldV2';

const { width } = Dimensions.get('window');

const ContainerWidth = width;

class ModalFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      cities: [],
      state: {
        name: '',
        id: '',
      },
      city: {
        name: '',
        id: '',
      },
    };
  }

  componentWillMount() {
    this.getStates();
  }

  getStates() {
    let data = [];
    firebaseDataBase.ref('states/mx')
      .once('value', snapshot => {
        data = this.objectToArray(snapshot.val());
        this.setState({ states: data });
      })
      .then(() => {
        this.handleSelectState(data[0].id);
      });
  }

    getCities = (stateId) => {
      const citiesRef = firebaseDataBase.ref(`cities/mx/${stateId}`);
      citiesRef.once('value', snapshot => {
        const data = this.objectToArray(snapshot.val());
        this.setState({
          cities: data,
          city: {
            name: data[0].name,
            id: data[0].id,
          },
        });
      });
    }

    handleSelectState = (state) => {
      firebaseDataBase.ref(`states/mx/${state}`)
        .once('value', snapshot => {
          this.setState({
            state: {
              name: snapshot.val().name,
              id: state,
            },
          });
        })
        .then(() => this.getCities(state));
    }

    handleSelectCity = (city) => {
      firebaseDataBase.ref(`cities/mx/${this.state.state.id}/${city}`)
        .once('value', snapshot => {
          this.setState({
            city: {
              name: snapshot.val().name,
              id: city,
            },
          });
        });
    }

    objectToArray(snapshotValue) {
      const data = snapshotValue;
      const dataWithKeys = Object.keys(data).map(key => {
        const obj = data[key];
        obj.id = key;
        return obj;
      });
      return dataWithKeys;
    }

    handleButton= () => {
      const { state, city } = this.state;
      this.props.handleFilter(state, city);
    }

    render() {
      return (
        <View style={{ backgroundColor: 'red' }}>
          <Modal
            animationType={'fade'}
            transparent
            visible={this.props.isOpenModalFilter}
            onRequestClose={() => { alert('Modal has been closed.'); }}
          >
            <View style={styles.container}>
              <View style={styles.box}>
                <View>
                  <TouchableHighlight
                    style={{ paddingHorizontal: 11, alignSelf: 'flex-end' }}
                    onPress={this.props.handleModalFilter}
                  >
                    <Icon
                      name="ios-close-outline"
                      color="#000"
                      size={30}
                    />
                  </TouchableHighlight>
                  <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>Mascota</Text>
                </View>
                <View style={styles.ContainerBox}>
                  <Picker
                    selectedValue={this.state.state.id}
                    onValueChange={(itemValue) => this.handleSelectState(itemValue)}
                    label="Estado"
                    items={this.state.states}
                    width={((ContainerWidth - 20) / 2)}
                  />
                  <Picker
                    selectedValue={this.state.city.id}
                    onValueChange={(itemValue) => this.handleSelectCity(itemValue)}
                    label="Ciudad"
                    items={this.state.cities}
                    width={((ContainerWidth - 20) / 2)}
                  />
                </View>
                <Button
                  title='Filtrar'
                  onPress={this.handleButton}
                />
              </View>
            </View>
          </Modal>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#fff',
    width: (ContainerWidth - 20),
    height: 300,
    justifyContent: 'space-between',
  },
  ContainerBox: {
    padding: 5,
    alignItems: 'center',
  },
});

export default ModalFilter;
