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
  ListView,
} from 'react-native';

class ListingDetailCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listing: props
    };
  }

  componentDidMount () {
      let response = await fetch("http://192.168.84.183:8080/api/v1/reviews/listing/1" + this.state.listing.key());
      let responseJson = await response.json();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson)
      });
  }

  _renderRow (item) {
    return <Text style={styles.ratingText}>{item.rating}</Text><Text>{item.review_text}</Text>;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
          style={{flex: 1}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

AppRegistry.registerComponent('ListingDetailCoupon', () => ListingDetailCoupon);
