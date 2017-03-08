import Colors from '../colors';

export default {
  placeholder : {
    placeholderTextColor: Colors.white,
  },

  wrapper: {
    flexDirection: 'column',
    margin: 20,
  },

  imageWrapper: {
    height: 170,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    margin: 10,
  },

  image: {
    width: 100,
    height: 100,
    backgroundColor: Colors.app.main,
    margin: 20,
  },

  imageText: {
    flex: 1,
    color: Colors.app.main,
  },
};
