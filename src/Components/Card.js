import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

class Card extends Component {

  render() {
    return (
            <View style={styles.CardContainer}>
                <Image style={styles.image} source={{uri: "https://static.pexels.com/photos/58997/pexels-photo-58997.jpeg"}} />
                <View style={styles.info}>
                    <Text style={styles.name}>Beto</Text>
                    <View style={styles.row}>
                        <View style={styles.infoData}>
                            <Text>Edad</Text>
                            <Text style={styles.count}>2 años</Text>
                        </View>
                        <View style={styles.infoData}>
                            <Text style={styles.count}>Raza</Text>
                            <Text>Lobo</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
  image: {
      width: 150,
      height: 150
  },
  CardContainer: {
      margin: 5,
      backgroundColor: 'white',
      flexDirection: 'row',
      elevation: 3, // android
      shadowColor: 'black', //ios
      shadowOpacity: .2, //ios
      shadowOffset: { //ios
          height: 1,
          width: -2
      }
  },
  info: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
  },
  name: {
      fontSize: 20,
      marginTop: 10,
      color: '#333'
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 15
  },
  infoData: {
      flex: 1,
      alignItems: 'center',
  },
  count: {
      color: 'gray'
  }
});

export default Card;
