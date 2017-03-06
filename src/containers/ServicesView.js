import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';

import ServiceCard from '../components/ServiceCard';
import { ErrorMessages } from '../constants/Errors';

export default class ServicesView extends Component {

  static componentName = 'ServicesView';

  static propTypes = {
    services: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super();

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.services.list),
      isRefreshing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    let updatedState = this.state.dataSource.cloneWithRows(nextProps.services.list);
    this.setState({dataSource: updatedState});
  }

  render() {
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
}
