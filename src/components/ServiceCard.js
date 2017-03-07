import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

/*  Global styles  */
import { GridStyle } from '../style/';
/*  Component styles  */
import ServiceCardStyle from '../style/components/service-card';

export default class ServiceCard extends Component {
  static componentName = 'ServiceCard';

  static propTypes = {
    service: React.PropTypes.object,
  };

  onPress = () => {
     Actions.servicesEdit({serviceKey: this.props.service.key});
  }

  render() {
    const { service } = this.props;

    return (
      <TouchableOpacity style={[ GridStyle.row, GridStyle.padding ]} onPress={this.onPress}>
        <Image
          style={[ ServiceCardStyle.image ]}
          source={{ uri : service.ImageUrl }}
        />

      <View style={[ ServiceCardStyle.textBox ]}>
          <Text style={[ ServiceCardStyle.textName ]}>{service.Name}</Text>
          <Text style={[ ServiceCardStyle.textInfo ]}>{service.Duration*5} min • {service.Price} €</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
