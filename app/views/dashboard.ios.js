/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

const Firebase = require('../config/Firebase.js');
const db = Firebase.database();

const CustomComponents = require('../components');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([
        { 'name': 'Events', 'type': 'category', 'description': 'Have fun with family and friends!' },
        { 'name': 'Event Map', 'type': 'map', 'description': 'View events near you!' },
        { 'name': 'Jobs', 'type': 'category', 'description': 'Start getting a steady paycheck.' },
        { 'name': 'Coupons', 'type': 'category', 'description': 'Save big money!' },
        { 'name': 'Help', 'type': 'category', 'description': 'Find help paying rent, food, and other life necessities.' }
      ])
    };
    this.listings = db.ref("listings");
  }

  _renderRow (item) {
    if (item.type === 'category') {
        return (
          <CustomComponents.Category item={item} {...this.props} />
        );
    } else if (item.type === 'map') {
        return <CustomComponents.Map {...this.props} />
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CustomComponents.TopBar />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          style={styles.listContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 50,
  },
});

AppRegistry.registerComponent('Dashboard', () => Dashboard);

module.exports = Dashboard;
