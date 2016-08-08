import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import RefreshableListView from './RefreshableListView.js';
import CommonView from './CommonView.js';
import Config from '../cfg/config.js';

import Style from '../styles/IndexView_style.js';


export default class IndexView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        tabLoaded: false
      };
  }

  fetchData() {
    storage.load({
      key: 'channelName'
    }).then((tabData) => {
      this.setState({
        tabData,
        tabLoaded: true
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if(this.state.tabLoaded){
      let oLabels = {};
      let Views = this.state.tabData.map((label, i) => {
        return (<RefreshableListView navigator={this.props.navigator} tabLabel={label} key={i}/>)
      });
      return (
        <View style={Style.container}>
          <ScrollableTabView style={Style.scrollableTabView}
              tabBarInactiveTextColor={'rgba(255, 255, 255, .8)'} tabBarActiveTextColor={'#fff'} tabBarTextStyle={Style.tabBarTextStyle}
              scrollWithoutAnimation={true}
              initialPage={0} renderTabBar={ () => <ScrollableTabBar style={Style.scrollableTabBar} tabStyle={Style.tabStyle} underlineHeight={0} /> }
            >
            {Views}
          </ScrollableTabView>
        </View>
      );
    }
    return CommonView.getLoadingView();
  }
}
