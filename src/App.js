import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { connect, Provider } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';

const RouterWithRedux = connect()(Router);

import reducers from './reducers';
import ServicesView from './containers/ServicesContainer';
import ServicesEditView from './containers/ServicesEditContainer';

// create store...
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

export default class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {routes} = this.context;
    
    return (
      <Provider store={store}>
        <RouterWithRedux>
            <Scene
              sceneStyle={{ marginTop:65 }}
              key="servicesList"
              component={ServicesView}
              title="Services"
              onRight={() => Actions.servicesEdit() }
              rightTitle="New"
              />
            <Scene
              sceneStyle={{ marginTop:65 }}
              key="servicesEdit"
              component={ServicesEditView}
              title="Services"
              onRight={() => Actions.servicesList()}
              rightTitle="Save"
            />
        </RouterWithRedux>
      </Provider>
    );
  }
}
