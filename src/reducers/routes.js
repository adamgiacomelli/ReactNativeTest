import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
  services: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    default:
      return state;
  }
}
