//Dependencies
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';

import Map from '../Components/Map';

class PetDetail extends Component {

    handlePhone = (phone, promp) => {
        Communications.phonecall(phone, promp)
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{uri: "https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/500F9F07-C391-4312-80465035E37A92EB/thul-d927ae3d-05e8-5b64-9a51-edc20022b2d9.jpg?response-content-disposition=inline"}} />
                    </View>
                    <View style={styles.paddingSection}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Nombre</Text>
                                <Text>firulais (Macho)</Text>
                            </View>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Raza</Text>
                                <Text>Mestizo/cruza</Text>
                            </View>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Edad</Text>
                                <Text>1año</Text>
                            </View>
                        </View> 
                    </View>
                    <View style={styles.paddingSection}>
                        <Text style={styles.sectionTitle}>Descripción</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magnam maiores animi velit asperiores ipsam dolorem eveniet vitae molestias sequi quae iusto dolor molestiae obcaecati, esse illum explicabo aliquam? Ab!
                            </Text>
                        </View>
                    </View>
                    <View style={styles.paddingSection}>
                        <Text style={styles.sectionTitle}>Contacto</Text>
                        <View style={styles.infoContent}>
                            <View style={styles.infoData}>
                                <TouchableOpacity 
                                    style={{flexDirection: "row", alignItems: "center"}}
                                    onPress={() => this.handlePhone('8442554476', true)}>
                                    <Icon name="ios-call-outline" size={25} color="#373737" />
                                    <Text style={{marginLeft: 5}}>8442923533</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.infoData}>
                                <TouchableOpacity
                                    style={{flexDirection: "row", alignItems: "center"}}
                                    onPress={() => Communications.email(['josee-45@hotmail.com'],null,null,'My Subject','My body text')}>
                                    <Icon name="ios-mail-outline" size={25} color="#373737" />
                                    <Text style={{marginLeft: 5}}>josee-45@hotmail.com</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.infoData} style={{flexDirection: "row", alignItems: "center"}}>
                                    <Icon name="logo-facebook" size={25} color="#373737" />
                                    <Text style={{marginLeft: 5}}>BetoCordobaLugo</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.sectionTitle}>Ubicación</Text>
                        <Map />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
    },
    paddingSection: {
        paddingHorizontal: 20
    },
    imageContainer: {
        alignItems: "center",
    },
    image: {
        borderRadius: 100,
        width: 200,
        height: 200,
    },
    infoContent: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "white",
        borderColor: "#e0e0e0",
        padding: 15,
        marginBottom: 10
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingBottom: 17,
        paddingTop: 17,
    },
    label: {
        color: "black"
    },
    descriptionContainer: {
        backgroundColor: '#e9ebee',
        padding: 10
    },
    sectionTitle: {
        paddingVertical: 5
    }
});

export default PetDetail;