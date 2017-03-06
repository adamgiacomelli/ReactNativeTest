/**
 * Launch Screen Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { connect } from 'react-redux';

// The component we're mapping to
import ServicesRender from './ServicesEdit';
import * as actions from '../actions/ServiceActions';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  services: state.services,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesRender);
