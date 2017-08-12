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
      const { imagePath, name, breed, gender, age } = this.props.item;
    return (
            <View style={styles.CardContainer}>
                <Image style={styles.image} source={{uri: imagePath ? imagePath
                    : "https://static.pexels.com/photos/58997/pexels-photo-58997.jpeg"  }} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}/Adopción</Text>
                    <View style={styles.infoData}>
                        <Text>{breed}</Text>
                        <Text style={styles.count}>{gender}/{age}</Text>
                    </View>
                    <Text style={styles.location}>Saltillo, Coahuila</Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 17,
        marginTop: 10,
        color: '#333'
    },
    infoData: {
    alignItems: 'center',
    marginTop: 12
    },
    count: {
        color: 'gray'
    },
    location: {
        marginTop: 15
    }
});

export default Card;
