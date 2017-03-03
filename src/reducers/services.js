import ServiceActionConst from '../actions/ServiceConstants';
import uuid from 'react-native-uuid'

const DEFAULT_STATE = {
  list: [{
    key: 0,
    Name: "Childs Haircut",
    Price: 5.00,
    Description: "We cut your childs hair.",
    Duration: 20,
    ImageUrl: "http://sites3.webnow.com/cutiecuts/wp-content/uploads/sites/81/2016/06/kids-haircut-22.jpg"
  },
  {
    key: 1,
    Name: "Mans Haircut",
    Price: 25.00,
    Description: "We cut your mans hair.",
    Duration: 35,
    ImageUrl: "https://cdn.shutterstock.com/shutterstock/videos/16414177/thumb/1.jpg"
  }
]}

export default (state = DEFAULT_STATE, {type, payload} = action) => {
  switch(type) {
    case ServiceActionConst.ADD_SERVICE:
    //Generate uuid for new service
    payload.key = uuid.v4();
    return {
      ...state,
      list: [...state.list, payload],
    }
    case ServiceActionConst.UPDATE_SERVICE:
      return {
        ...state,
        list: state.list.map( (el, i) => el.key == payload.key ? payload : el),
      }
    case ServiceActionConst.DELETE_SERVICE :
      return {
        ...state,
        list: state.list.filter( (el, i) => el.key == payload.key ),
      }
    default:
      return state
  }
}
