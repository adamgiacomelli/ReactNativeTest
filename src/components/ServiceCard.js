import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class ServiceCard extends Component {
  static componentName = 'ServiceCard';

  onPress = () => {
     Actions.servicesEdit({serviceKey: this.props.service.key});
  }

  render() {
    const { onPress, service } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text>Name: {service.Name}</Text>
        <Text>Price: {service.Price}</Text>
        <Text>Description: {service.Description}</Text>
        <Text>Duration: {service.Duration}</Text>
      </TouchableOpacity>
    );
  }
};
