import React, { Component, PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';
import { Actions, Scene } from 'react-native-router-flux';

import ServiceCard from '../components/ServiceCard';
import { ErrorMessages } from '../constants/Errors';

export default class ServicesView extends Component {
  static componentName = 'ServicesView';

  constructor(props) {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.services.list),
      isRefreshing: false
    };
  }

  update = () => {
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.services.list);
  }

  render() {
    this.update();
    const { services } = this.props;
    const { isRefreshing, dataSource } = this.state;

    if (!isRefreshing && (!services || services.list.length < 1)) {
      return <Text> text={ErrorMessages.servicesEmpty} </Text>;
    }

    return (
      <View>
        <ListView
          dataSource={dataSource}
          renderRow={service => <ServiceCard service={service}/>}
        />
      </View>
    );
  }
};
