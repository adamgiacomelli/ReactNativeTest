import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Actions, Scene } from 'react-native-router-flux';

const dismissKeyboard = require('dismissKeyboard');

const mode = {
    NEW: 0,
    EDIT: 1
}

export default class ServicesEdit extends Component {
  static componentName = 'ServicesEdit';

  constructor(props) {
     super(props);
     let key = props.serviceKey;
     this.mode = key != undefined ? mode.EDIT : mode.NEW;
     if(this.mode == mode.NEW) {
       this.state = {
           Name: "",
           Price: 0,
           Description: "",
           Duration: 0,
           ImageUrl: ""
       };
     } else {
       let service = props.services.list.find( e => {return key == e.key})
       this.state = service;
     }
   }

  componentDidMount() {
    if(this.mode == mode.NEW) {
      Actions.refresh({rightTitle: 'Save', onRight: this.addService, title:"New service"})
    } else {
      Actions.refresh({rightTitle: 'Update', onRight: this.updateService, title: this.state.Name })
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
      )
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
      )
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
      <View style={{flex:1, flexDirection: 'column'}}>
        <View style={{height: 150, flexDirection: 'row',  justifyContent:'center'}}>
            <Image
              style={{width: 150, height: 150, backgroundColor: 'powderblue'}}
              source={{ uri : this.state.ImageUrl }}
            />
        </View>
        <FormLabel>Name*</FormLabel>
          <FormInput
            value={ this.state.Name }
            onChangeText={ (name) => this.setState({Name: name}) }
            />
          <FormLabel>Price*</FormLabel>
          <FormInput
            value={ this.state.Price.toString() }
            onChangeText={ (price) => this.setState({Price: price}) }
            keyboardType = 'numeric'
          />
          <FormLabel>Description</FormLabel>
          <FormInput
            value={ this.state.Description }
            onChangeText={ (description) => this.setState({Description: description}) }
          />
          <FormLabel>Duration</FormLabel>
          <FormInput
            value={ this.state.Duration.toString() }
            onChangeText={ (duration) => this.setState({Duration: duration}) }
            keyboardType = 'numeric'
          />
          <FormLabel>ImageUrl</FormLabel>
          <FormInput
            value={ this.state.ImageUrl }
            onChangeText={ (imageurl) => this.setState({ImageUrl: imageurl}) }
          />
      </View>
    );
  }
};
