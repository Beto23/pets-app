//Dependiencies
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

//Styles
import { CardStyles } from '../Styles/Card';


class CardDescription extends Component {

  render() {
    return (
            <View style={CardStyles.CardContainer}>
                <Image style={CardStyles.image} source={{uri: "https://static.pexels.com/photos/22346/pexels-photo.jpg"}} />
                <View style={styles.description}>
                    <View style={{alignItems: "center"}}>
                        <Text>Mona</Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Ciudad</Text>
                            <Text>Saltillo</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Colonia</Text>
                            <Text>Roma</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
    description: {
      flex: 1,
      padding: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    label: {
        color: "black"
    }
});

export default CardDescription;
