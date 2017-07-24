//Dependencies
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';

class PetDetail extends Component {

    handlePhone = (phone, promp) => {
        Communications.phonecall(phone, promp)
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image}
                        source={{uri: "https://static.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg"}} />
                    <Text>firulais</Text>
                </View>
                <View style={styles.infoDog}>
                    <View style={styles.info}>
                        <View style={styles.infoData}>
                            <Text style={styles.label}>Edad</Text>
                            <Text>1año</Text>
                        </View>
                        <View style={styles.infoData}>
                            <Text style={styles.label}>Raza</Text>
                            <Text>Pug</Text>
                        </View>
                        <View style={styles.infoData}>
                            <Text style={styles.label}>Esterilizado</Text>
                                <Text>Si</Text>
                        </View>
                    </View> 
                </View>
                <Text>Contacto</Text>
                <View style={styles.infoContent}>
                   <View style={styles.info}>
                        <View style={styles.infoData}>
                            {/*<Text style={styles.label}>Telefono</Text>*/}
                            <TouchableOpacity 
                                style={{flexDirection: "row", alignItems: "center"}}
                                onPress={() => this.handlePhone('8442554476', true)}>
                                <Icon name="ios-call-outline" size={30} color="#373737" />
                                <Text style={{marginLeft: 5}}>8442923533</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoData}>
                            {/*<Text style={styles.label}>Email</Text>*/}
                            <TouchableOpacity
                                style={{flexDirection: "row", alignItems: "center"}}
                                onPress={() => Communications.email(['josee-45@hotmail.com'],null,null,'My Subject','My body text')}>
                                <Icon name="ios-mail-outline" size={30} color="#373737" />
                                <Text style={{marginLeft: 5}}>josee-45@hotmail.com</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   <View style={styles.info}>
                        <View style={styles.infoData}>
                            <Text style={styles.label}>Estado</Text>
                            <Text>Coahuila</Text>
                        </View>
                        <View style={styles.infoData}>
                            <Text style={styles.label}>Pais</Text>
                            <Text>México</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 20
    },
    imageContainer: {
        alignItems: "center",

    },
    image: {
        borderRadius: 100,
        width: 150,
        height: 150,
    },
    infoContent: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "white",
        marginTop: 15,
        borderColor: "#e0e0e0"
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingBottom: 17,
        paddingTop: 17        
    },
    infoData: {
        flex: 1
    },
    label: {
        color: "black"
    }
});

export default PetDetail;