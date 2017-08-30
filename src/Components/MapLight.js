// Dependencies
import React, { Component } from 'react';

import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';

class Map extends Component {
  render() {
    const { region } = this.props;
    return (
      <View style={styles.container}>
        {region.latitude ? <MapView
          ref={(ref) => { this.mapRef = ref; }}
          style={styles.map}
          region={region}
        >
          <MapView.Marker
            identifier="marker1"
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Mascota Perdida"
          />
          <MapView.Circle
            center={{
              latitude: region.latitude,
              longitude: region.longitude,
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
