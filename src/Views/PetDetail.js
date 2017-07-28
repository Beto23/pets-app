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
                </View>
                <View>
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
                <View>
                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magnam maiores animi velit asperiores ipsam dolorem eveniet vitae molestias sequi quae iusto dolor molestiae obcaecati, esse illum explicabo aliquam? Ab!
                        </Text>
                    </View>
                </View>

                <View>
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
        borderColor: "#e0e0e0",
        padding: 15
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
    description: {
        textAlign: 'justify'
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