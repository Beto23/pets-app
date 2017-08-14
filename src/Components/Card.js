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
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.infoData}>
                        <Text>{breed}</Text>
                        <Text style={styles.count}>{gender}</Text>
                        <Text style={styles.count}>{age}</Text>                        
                        <Text style={styles.location}>Saltillo, Coahuila</Text>
                    </View>
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 2
    },
    CardContainer: {
        margin: 5,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        // elevation: 3, // android
        shadowColor: 'black', //ios
        shadowOpacity: .2, //ios
        shadowOffset: { //ios
            height: 1,
            width: -2
        }
    },
    info: {
        paddingLeft: 10,
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 17,
        marginTop: 0,
        color: '#333'
    },
    infoData: {
        marginTop: 0
    },
    count: {
        color: 'gray'
    },
});

export default Card;
