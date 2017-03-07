import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import dismissKeyboard from 'dismissKeyboard';
import FormNative from 'tcomb-form-native';

import ServicesEditStyle from '../style/components/services-edit';
import FormStylesheet from '../style/components/form-style';
import Colors from '../style/colors';

import SelectMinutesTemplate from '../components/SelectMinutes';

/*                */
/* Configure Form */
/*                */

let Form = FormNative.form.Form;
let Service = FormNative.struct({
  Name: FormNative.String,
  Price: FormNative.Number,
  Description: FormNative.String,
  Duration: FormNative.Number,
  ImageUrl: FormNative.String,
});


//Update options
let options = {
   stylesheet: FormStylesheet,
   auto: 'placeholders',
   fields: {
     Name: {
       label: 'Service name',
       placeholderTextColor: Colors.form.placeholder,
       placeholder: 'e.g. Smokey eye makeup',
     },
     Description: {
       label: 'Describe your service',
       placeholderTextColor: Colors.form.placeholder,
     },
     Price: {
       label: 'Price',
       placeholderTextColor: Colors.form.placeholder,
       placeholder: 'e.g. $100',
     },
     Duration: {
       label: 'Total duration',
       template: SelectMinutesTemplate,
     },
   },
};

/* Component mode enum */
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
