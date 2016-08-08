import React, {Component} from 'react';
import
{
  View,
  Text
} from 'react-native';

import {Bars} from 'react-native-loader';

import CommonStyle from '../styles/Common_style.js';

export default {

  getLoadingView() {
    return (
      <View style={CommonStyle.loadingContainer}>
          <Bars size={10} color="#ed4040"/>
          <Text style={CommonStyle.loadingText}>正在加载中</Text>
      </View>
    );
  }

}
