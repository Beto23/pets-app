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
                        <Text><Text style={styles.label}>Raza:</Text> {breed}</Text>
                        <Text style={styles.count}><Text style={styles.label}>Genero:</Text> {gender}</Text>
                        <Text style={styles.count}><Text style={styles.label}>Edad</Text>: {age}</Text>                        
                        <Text style={styles.location}><Text style={styles.label}>Ciudad:</Text> Saltillo, Coahuila</Text>
                    </View>
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    CardContainer: {
        margin: 5,
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 1, // android
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
        color: '#333',
        textAlign: 'center'
    },
    infoData: {
        marginTop: 0
    },
    count: {
        color: 'gray'
    },
    label: {
        fontWeight: '500'
    }
});

export default Card;
