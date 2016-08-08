import { StyleSheet } from 'react-native';

import Dimensions from 'Dimensions';

// let { height } = Dimensions.get('window');

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  loadingText: {
    color: '#ccc',
    fontSize: 12
  }
});
