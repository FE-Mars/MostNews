/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import IndexView from './views/IndexView.js';
import Config from './cfg/config.js';

import Storage from 'react-native-storage';

class MostNews extends Component {
  render() {
    let defaultName = 'IndexView';
    let defaultComponent = IndexView;
    let storage = new Storage({
      size: 1000,
      defaultExpires: 1000 * 3600 * 24 * 7,
      enableCache: true
    });
    storage.sync = {
      channelName(params) {
        let { resolve, reject } = params;
        fetch(Config.CHANNEL_NEWS_URL, {
          headers: {
            apikey: Config.apikey
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
          let oLabels = {}, tabData = [];
          responseData.showapi_res_body.channelList.forEach((obj) => {
            let label = obj.name.replace(/(焦点)|(最新)$/, ''), hasLabel = oLabels[label] || false;
            if(!hasLabel){
              oLabels[label] = true;
              tabData.push(label);
            }
          });
          storage.save({
            key: 'channelName',
            rawData: tabData
          });
          resolve && resolve(tabData, true);
        }).catch((err) => {
          console.warn(err);
          reject && reject(err);
        });
      }
    }
    global.storage = storage;
    return (
    <Navigator
      initialRoute={{ name: defaultName, component: defaultComponent, params: { storage } }}
      configureScene={(route) => {
        return Navigator.SceneConfigs.PushFromRight;
      }}
      renderScene={(route, navigator) => {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }
}

AppRegistry.registerComponent('MostNews', () => MostNews);
