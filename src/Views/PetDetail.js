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

//Components
import Map from '../Components/Map';

class PetDetail extends Component {

    handlePhone = (phone, promp) => {
        Communications.phonecall(phone, promp)
    }

    render() {
        const { age, breed, description, email, gender, imagePath, name, nameContact, phone, size, specie } = this.props.data;
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{uri: imagePath}} />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text>{`${specie} en adopción`}</Text>
                    </View>
                    <View style={styles.paddingSection}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Nombre</Text>
                                <Text>{name}</Text>
                            </View>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Raza</Text>
                                <Text>{breed}</Text>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Tamaño</Text>
                                <Text>{size}</Text>
                            </View>
                            <View style={styles.infoData}>
                                <Text style={styles.label}>Edad</Text>
                                <Text>{age}</Text>
                            </View>
                        </View>  
                    </View>
                    <View style={styles.paddingSection}>
                        <Text style={styles.sectionTitle}>Descripción</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>
                                {description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.paddingSection}>
                        <Text style={styles.sectionTitle}>Contacto</Text>
                        <View style={styles.infoContent}>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Icon name="ios-contact-outline" size={25} color="#373737" />
                                        <Text style={{marginLeft: 10}}>{nameContact}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={{flexDirection: "row", alignItems: "center"}}
                                    onPress={() => this.handlePhone(phone, true)}>
                                    <Icon name="ios-call-outline" size={25} color="#373737" />
                                    <Text style={{marginLeft: 10}}>{phone}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={{flexDirection: "row", alignItems: "center"}}
                                    onPress={() => Communications.email([email],null,null,'My Subject','My body text')}>
                                    <Icon name="ios-mail-outline" size={25} color="#373737" />
                                    <Text style={{marginLeft: 10}}>{email}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Icon name="logo-facebook" size={25} color="#373737" />
                                    <Text style={{marginLeft: 5}}>BetoCordobaLugo</Text>
                            </View> */}
                        </View>
                    </View>
                    {/* <View>
                        <Text style={styles.sectionTitle}>Ubicación</Text>
                        <Map />
                    </View> */}
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
        width: 130,
        height: 130,
    },
    infoData: {
        width: 100
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