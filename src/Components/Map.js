//Dependencies
import React, { Component } from 'react';

import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';

class Map extends Component {
    constructor(props){
        super(props);

        this.state = {
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null
            }
        }
    }

    calcDelta(lat, lon, accuracy) {
        const oneDegreeOfLogitudInMeters = 111.32;
        const circumference = (40075 / 360);

        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLogitudInMeters);

        this.setState({
            region: {
                latitude: lat,
                longitude: lon,
                latitudeDelta: 1, // valor real latitudeDelta: latDelta
                longitudeDelta: 1 // valor real longitudeDelta: lonDelta
            }
        })
    }

    componentDidMount() {
        /** Para funciones en celular real quitar:
         * {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
         */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                this.calcDelta(lat, lon, accuracy);
            },
            (error) => console.log(error, 'error'),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
        )
    }

    marker() {
        return{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }
    }

    render() {
        const { region } = this.state;
        console.log(region, 'region')
        return(
            <View style={styles.container}>
                {region.latitude ? <MapView
                    style={styles.map}
                    initialRegion={this.state.region}
                >
                    <MapView.Marker
                        coordinate={this.marker()}
                        title= "I'm here"
                        description= "home"    
                    />
                </MapView>: null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: 300,
    }
});

export default Map;