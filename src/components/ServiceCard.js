import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class ServiceCard extends Component {
  static componentName = 'ServiceCard';

  onPress = () => {
     Actions.servicesEdit({serviceKey: this.props.service.key});
  }

  render() {
    const { onPress, service } = this.props;

    return (
      <TouchableOpacity style={{flex:1, padding: 10, flexDirection: 'row' }} onPress={this.onPress}>
        <Image
          style={{width: 75, height: 75, backgroundColor: 'powderblue'}}
          source={{ uri : service.ImageUrl }}
        />
      <View style={{
          marginLeft: 10,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Text>{service.Name}</Text>
          <Text>{service.Duration}min {service.Price} €</Text>
        </View>
      </TouchableOpacity>
    );
  }
};
