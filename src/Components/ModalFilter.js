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

const { width } = Dimensions.get('window');

const ContainerWidth = width;

class ModalFilter extends Component {
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
                <Text style={{ color: '#000', fontSize: 18 }}>Mascota</Text>
              </View>
              <Button
                title='Filtrar'
                onPress={() => console.log('press button')}
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
