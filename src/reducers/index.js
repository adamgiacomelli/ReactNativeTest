import { combineReducers } from 'redux';

import routes from './routes';
import services from './services';

export default combineReducers({
  routes,
  services,
});

export const getRoutes = ({routes}) => routes;
export const getServices = ({services}) => services;
