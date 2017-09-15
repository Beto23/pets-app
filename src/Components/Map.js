// Dependencies
import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';
import { getLocationAddres } from '../shared/apiMap';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = (LATITUDE_DELTA * ASPECT_RATIO);

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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({
          region: {
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
        this.props.handleMap(lat, lng, LATITUDE_DELTA, LONGITUDE_DELTA);
      },
      (error) => console.log(error, 'error'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 }
    );

    // setTimeout(() => {
    //   this.mapRef.fitToSuppliedMarkers(['marker1'], true);
    // }, 3000);
  }

  marker() {
    return {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    };
  }

  handleSearch = () => {
    const { neighborhood, street, state, city } = this.props;
    getLocationAddres(neighborhood, street, state, city)
      .then(data => data.results[0])
      .then(result => result.geometry)
      .then(geometry => {
        const lat = geometry.location.lat;
        const lng = geometry.location.lng;
        this.setState({
          region: {
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
        this.props.handleMap(lat, lng, LATITUDE_DELTA, LONGITUDE_DELTA);
      })
      .catch(error => console.log(error, 'error'));    
  }

  handleButtonDisabled = () => {
    const { neighborhood, street, state, city } = this.props;
    if (neighborhood && street && state && city) {
      return false;
    }
    return true;
  }

  render() {
    const { region } = this.state;
    const { neighborhood, street, state, city } = this.props;
    return (
      <View style={styles.container}>
        {region.latitude ? <View>
          <Text>
            {neighborhood ? `${neighborhood},` : null}
            {street ? `${street},` : null}
            {city ? `${city},` : null}
            {state ? `${state},` : null}
          </Text>
          <Button title="Localizar" onPress={this.handleSearch} disabled={this.handleButtonDisabled()} />
        </View> : null}

        {region.latitude ? <MapView
          ref={(ref) => { this.mapRef = ref; }}
          style={styles.map}
          region={this.state.region}
        >
          <MapView.Marker
            identifier="marker1"
            coordinate={this.marker()}
            title="Mascota Perdida"
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
