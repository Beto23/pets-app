// Dependencies
import React, { Component } from 'react';

import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';
import { getLocationAddres } from '../shared/apiMap';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      },
    };
  }
  componentDidMount() {
    /** Para funciones en celular real quitar:
        * {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
    */
    getLocationAddres()
      .then(data => data.results[0])
      .then(result => result.geometry)
      .then(geometry => {
        this.setState({
          region: {
            latitude: geometry.location.lat,
            longitude: geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: (0.0922 * ASPECT_RATIO),
          },
        });
      })
      .catch(error => console.log(error, 'error'));
    setTimeout(() => {
      this.mapRef.fitToSuppliedMarkers(['marker1'], true);
    }, 2000);
  }

  marker() {
    return {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    };
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        {region.latitude ? <MapView
          ref={(ref) => { this.mapRef = ref; }}
          style={styles.map}
          region={this.state.region}
        >
          <MapView.Marker
            identifier="marker1"
            coordinate={this.marker()}
            title="Mascota"
            description="Dalmata perdida"
            onDragEnd={(e) => console.log('moviendo', e.nativeEvent.coordinate)}
          />
          <MapView.Circle
            center={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
            radius={200}
            strokeColor="black"
            fillColor="rgba(255, 0, 0, 0.46)"
          />
        </MapView> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});

export default Map;
