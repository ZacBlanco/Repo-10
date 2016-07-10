/**
 * HelperUpper React Native App
 * https://github.com/Opportunity-Hack-San-Jose-2016/Repo-10
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
  constructor(props) {
      super(props);
      this.state.markers = [];
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }
    );
    fetch("http://b35afecc.ngrok.io/api/v1/listings/nearby/15?lat=" + this.state.lat + "&lng=" + this.state.lng)
      .then((res) => res.json())
      .then((resJSON) => {
        var markers = [];
        var marker;
        for (var key in resJSON) {
            if (resJSON.hasOwnProperty(key)) {
                marker = {
                    title: resJSON[key][name],
                    description: "placeholder",
                    coordinate: {
                        latitude: resJSON[key]["location"]["lat"],
                        longitude: resJSON[key]["location"]["lng"]
                    }
                };
                markers.push(marker);
            }
        }
        this.setState({
            markers: markers
        });
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: 300,
  }
})

AppRegistry.registerComponent('Map', () => Map);

module.exports = Map;
