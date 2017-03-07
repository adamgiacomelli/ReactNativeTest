import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';

const RouterWithRedux = connect()(Router);

import reducers from './reducers';
import ServicesView from './containers/ServicesContainer';
import ServicesEditView from './containers/ServicesEditContainer';

/*  Component styles  */
import SceneStyle from './style/components/scene';

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
      <Provider style={[ SceneStyle.main ]} store={store}>
        <RouterWithRedux
          navigationBarStyle={[ SceneStyle.navbar ]}
          titleStyle={[ SceneStyle.navbarTitle ]}
          getSceneStyle={() => (SceneStyle.transitions) }
          >
            <Scene
              sceneStyle={[ SceneStyle.main ]}
              key="servicesList"
              component={ServicesView}
              title="Services"
              onRight={() => Actions.servicesEdit() }
              rightButtonTextStyle={[ SceneStyle.navbarBtnText ]}
              leftButtonTextStyle={[ SceneStyle.navbarBtnText ]}
              leftButtonIconStyle={[ SceneStyle.backBtnText ]}
              rightTitle="New"
              />
            <Scene
              sceneStyle={[ SceneStyle.main ]}
              key="servicesEdit"
              component={ServicesEditView}
              title="Services"
              onRight={() => Actions.servicesList()}
              rightButtonTextStyle={[ SceneStyle.navbarBtnText ]}
              leftButtonTextStyle={[ SceneStyle.navbarBtnText ]}
              leftButtonIconStyle={[ SceneStyle.backBtnText ]}
              rightTitle="Save"
            />
        </RouterWithRedux>
      </Provider>
    );
  }
}
