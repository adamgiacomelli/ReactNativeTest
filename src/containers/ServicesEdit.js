import React, { Component } from 'react';
import { View, ScrollView, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


import ServicesEditStyle from '../style/components/services-edit';
import FormStylesheet from '../style/components/form-style';

const dismissKeyboard = require('dismissKeyboard');

const mode = {
    NEW: 0,
    EDIT: 1,
};

/*                */
/* Configure Form */
/*                */
const FormNative = require('tcomb-form-native');

let Form = FormNative.form.Form;
let Service = FormNative.struct({
  Name: FormNative.String,
  Price: FormNative.Number,
  Description: FormNative.String,
  Duration: FormNative.Number,
  ImageUrl: FormNative.String,
});

//Clone default stylesheet
//Update options
let options = {
   stylesheet: FormStylesheet,
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
         service: {
             Name: "",
             Price: 0,
             Description: "",
             Duration: 0,
             ImageUrl: "",
         },
       };
     } else {
       let service = props.services.list.find( e => {return props.serviceKey == e.key;});
       this.state = {service: service};
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
      this.props.addService(this.state.service);
      dismissKeyboard();
      Actions.pop();
  }

  updateService = () => {
      this.props.updateService(this.state.service);
      dismissKeyboard();
      Actions.pop();
  }

  onChange = (value) => {
    this.setState({service: value});
  }

  render() {
    return (
      <ScrollView style={[ ServicesEditStyle.wrapper ]}>
        <View style={[ ServicesEditStyle.imageWrapper ]}>
          <Image
            style={[ ServicesEditStyle.image ]}
            source={ this.state.service.ImageUrl != "" ? {uri : this.state.service.ImageUrl } :  require('../../public/img/placeholder_image.png')   }
            />
        </View>
        <Form
           ref="form"
           type={Service}
           value={this.state.service}
           options={options}
           onChange={this.onChange}
         />
      </ScrollView>
    );
  }
}
