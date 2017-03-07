import React, { Component } from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import ServicesEditStyle from '../style/components/services-edit';

const dismissKeyboard = require('dismissKeyboard');

const mode = {
    NEW: 0,
    EDIT: 1,
};

export default class ServicesEdit extends Component {
  static componentName = 'ServicesEdit';

  static propTypes = {
    serviceKey: React.PropTypes.string,
    services: React.PropTypes.object.isRequired,
    addService: React.PropTypes.func,
    updateService: React.PropTypes.func,
  };

  constructor(props) {
     super(props);
     this.mode = props.serviceKey != undefined ? mode.EDIT : mode.NEW;

     if(this.mode == mode.NEW) {
       this.state = {
           Name: "",
           Price: 0,
           Description: "",
           Duration: 0,
           ImageUrl: "",
       };
     } else {
       let service = props.services.list.find( e => {return props.serviceKey == e.key;});
       this.state = service;
     }
   }

  componentDidMount() {
    if(this.mode == mode.NEW) {
      Actions.refresh({rightTitle: 'Save', onRight: this.addService, title:"New service"});
    } else {
      Actions.refresh({rightTitle: 'Update', onRight: this.updateService, title: this.state.Name });
    }
  }

  addService = () => {
    if(this.validateForm()) {
      this.props.addService(this.state);
      dismissKeyboard();
      Actions.pop();
    } else {
      Alert.alert(
        'Service information missing',
        'Please enter the required fields',
      );
    }
  }

  updateService = () => {
    if(this.validateForm()) {
      this.props.updateService(this.state);
      dismissKeyboard();
      Actions.pop();
    } else {
      Alert.alert(
        'Service information missing',
        'Please enter the required fields',
      );
    }
  }

  //Minimal validation
  validateForm = () => {
    if(this.state.Name === "") {
      return false;
    } else if(this.state.Price == 0) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <ScrollView style={[ ServicesEditStyle.wrapper ]}>
        <View style={[ ServicesEditStyle.imageWrapper ]}>
            <Image
              style={[ ServicesEditStyle.image ]}
              source={ this.state.ImageUrl != "" ? {uri : this.state.ImageUrl } :  require('../../public/img/placeholder_image.png')   }
            />
        </View>
        <FormLabel>Service Name*</FormLabel>
          <FormInput
            style={[ ServicesEditStyle.input ]}
            value={ this.state.Name }
            onChangeText={ (name) => this.setState({Name: name}) }
            />
          <FormLabel>Price*</FormLabel>
          <FormInput
            style={[ ServicesEditStyle.input ]}
            value={ this.state.Price.toString() }
            onChangeText={ (price) => this.setState({Price: price}) }
            keyboardType = 'numeric'
          />
          <FormLabel>Description</FormLabel>
          <FormInput
            style={[ ServicesEditStyle.input ]}
            value={ this.state.Description }
            onChangeText={ (description) => this.setState({Description: description}) }
          />
          <FormInput
            style={[ ServicesEditStyle.input ]}
            placeholder="Total Duration"
            placeholderTextColor="#FFF"
            value={ this.state.Duration.toString() }
            onChangeText={ (duration) => this.setState({Duration: duration}) }
            keyboardType = 'numeric'
          />
          <FormLabel>ImageUrl</FormLabel>
          <FormInput
            style={[ ServicesEditStyle.input ]}
            value={ this.state.ImageUrl }
            onChangeText={ (imageurl) => this.setState({ImageUrl: imageurl}) }
          />
      </ScrollView>
    );
  }
}
