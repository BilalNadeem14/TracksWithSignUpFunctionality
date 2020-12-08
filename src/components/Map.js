import React from 'react';
import { Text, StyleSheet } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'

const Map = () => {
    return (
        <MapView 
          style={{height:500}}
          initialRegion={{
            latitude: 37.3322,
            longitude: -122,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        />
            
    )
}

const styles= StyleSheet.create({});

export default Map;