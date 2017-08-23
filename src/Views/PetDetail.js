// Dependencies
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';

// Components
// import Map from '../Components/Map';

class PetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDetail: {
        lost: 'Perdido',
        adop: 'en Adopción',
      },
    };
  }

    handlePhone = (phone, promp) => {
      Communications.phonecall(phone, promp);
    }

    render() {
      const { age, breed, description, email, gender, imagePath, name, nameContact, phone, size, specie } = this.props.data;
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerWithColor}>
              <View style={styles.imageContainer}>
                <Image 
                  style={styles.image}
                  source={{ uri: imagePath }}
                />
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={[styles.whiteText, { fontSize: 16, fontWeight: 'bold' }]}
                >
                  {specie} {this.props.isPetLost ? this.state.typeDetail.lost : this.state.typeDetail.adop}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.whiteText}>{name}</Text>
                <Text style={styles.whiteText}>{breed}</Text>
                <Text style={styles.whiteText}>{size}</Text>
                <Text style={styles.whiteText}>{age}</Text>
                <Text style={styles.whiteText}>{gender}</Text>
              </View>

            </View>
            <View style={styles.paddingSection}>
              <Text style={[styles.sectionTitle, styles.label]}>Descripción</Text>
              <View>
                <Text style={styles.descriptionText}>
                  {description}
                </Text>
              </View>
            </View>
            <View style={styles.paddingSection}>
              <Text style={[styles.sectionTitle, styles.label]}>Contacto</Text>
              <View style={styles.infoContent}>
                <View style={styles.contactContainer}>
                  <View style={styles.contactIconContainer}>
                    <Icon style={{ marginRight: 10 }} name="md-person" size={25} color="#0084ff" />
                    <Text style={{ marginLeft: 10 }}>{nameContact}</Text>
                  </View>
                </View>
                <View style={styles.contactContainer}>
                  <TouchableOpacity 
                    style={styles.contactIconContainer}
                    onPress={() => this.handlePhone(phone, true)}
                  >
                    <Icon style={{ marginRight: 10 }} name="md-call" size={25} color="#0084ff" />
                    <Text style={{ marginLeft: 10 }}>{phone}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contactContainer}>
                  <TouchableOpacity
                    style={styles.contactIconContainer}
                    onPress={() => Communications.email([email], null, null, 'My Subject', 'My body text')}
                  >
                    <Icon style={{ marginRight: 10 }} name="md-mail" size={25} color="#0084ff" />
                    <Text style={{ marginLeft: 10 }}>{email}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
}

PetDetail.defaultProps = {
  isPetLost: false,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  containerWithColor: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#0091EA',
  },
  contactContainer: {
    marginBottom: 15,
  },
  contactIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  whiteText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  paddingSection: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    borderRadius: 100,
    width: 130,
    height: 130,
  },
  infoData: {
    width: 100,
  },
  infoContent: {
    borderTopWidth: 1,
    backgroundColor: 'white',
    borderColor: '#e0e0e0',
    padding: 15,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 17,
    paddingTop: 17,
  },
  label: {
    color: 'black',
    fontWeight: '500',
    paddingVertical: 5,
  },
});

export default PetDetail;
