import React, {Component} from 'react';
import {
  Text,
  View,
  WebView,
  TouchableOpacity
} from 'react-native';

import Style from '../styles/NewsDetailView_style.js';

const WEBVIEW_REF = 'webview';

export default class NewsDetailView extends Component{
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <View style={Style.container}>
        <View style={Style.navigatorBar}>
          <TouchableOpacity style={Style.touchableOpacity} onPress={ e => this._pressButton(e)}>
              <Text style={Style.iconBack}>&lsaquo;</Text>
          </TouchableOpacity>
        </View>
        <WebView ref={WEBVIEW_REF} source={{uri: this.props.webView_ref}}/>
      </View>
    );
  }
  _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

}
