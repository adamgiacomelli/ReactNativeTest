import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import update from 'immutability-helper';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import dismissKeyboard from 'dismissKeyboard';
import FormNative from 'tcomb-form-native';

import ServicesEditStyle from '../style/components/services-edit';
import FormStylesheet from '../style/components/form-style';
import Colors from '../style/colors';

import SelectMinutesTemplate from '../components/SelectMinutes';


var imagePickerOptions = {
  title: 'Select service image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

/*                */
/* Configure Form */
/*                */

let Form = FormNative.form.Form;
let Service = FormNative.struct({
  Name: FormNative.String,
  Price: FormNative.Number,
  Description: FormNative.String,
  Duration: FormNative.Number,
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

  pickImage = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.uri == undefined) {
        console.log('No image selected');
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let newState = update(this.state,{
          service: { ImageUrl: { $set: response.uri } }
        });
        this.setState(newState);
        }
    });
  }

  onChange = (value) => {
    this.setState({service: value});
  }

  render() {
    return (
      <ScrollView style={[ ServicesEditStyle.wrapper ]}>
        <TouchableOpacity style={[ ServicesEditStyle.imageWrapper ]} onPress={this.pickImage}>
          <Image
            style={[ ServicesEditStyle.image ]}
            source={ this.state.service.ImageUrl != "" ? { uri: this.state.service.ImageUrl } :  require('../../public/img/placeholder_image.png')   }
            />
          <Text style={[ ServicesEditStyle.imageText ]}>Add service image</Text>
        </TouchableOpacity>
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
