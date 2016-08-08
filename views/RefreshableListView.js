import React, {Component} from 'react';
import {
  TouchableHighlight,
  ListView,
  Text,
  View,
  Image
} from 'react-native';

import Config from '../cfg/config.js';
import Style from '../styles/RefreshableListView_style.js';
import NewsDetailView from './NewsDetailView.js';
import CommonView from './CommonView.js';
import Dimensions from 'Dimensions';

let {width , height } = Dimensions.get('window');

export default class RefreshableListView extends Component{
  static defaultProps = {
    style: Style.view
  };

  constructor(props) {
      super(props);
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.state = {
        data: [],
        dataSource: ds,
        channelName: props.tabLabel,
        page: 1,
        loaded: false
      }
  }

  fetchData() {
    fetch(Config.SEARCH_NEWS_URL + `?channelName=${this.state.channelName}&page=${this.state.page}`, {
      headers: {
        apikey: Config.apikey
      }
    }).then((response) => response.json())
    .then((responseData) => {
      let data = [...this.state.data, ...responseData.showapi_res_body.pagebean.contentlist];
      this.setState({
        data: data,
        dataSource: this.state.dataSource.cloneWithRows(data),
        loaded: true,
        page: this.state.page+1
      });
    }).catch(function(err) {
      console.log(err);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  _pressItem(e, rowData) {
      const { navigator } = this.props;
      if(navigator) {
          navigator.push({
              name: 'NewsDetailView',
              component: NewsDetailView,
              params: {
                webView_ref: rowData.link
              }
          })
      }
  }

  render() {
    if(this.state.loaded){
      return (
        <ListView style={this.props.style}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderItem(rowData)}
          onEndReachedThreshold={30}
          onEndReached={e=>this.onEndReached(e)}
        >
          {this.props.children}
        </ListView>
      );
    }else{
      return CommonView.getLoadingView();
    }

  }

  onEndReached(e) {
    this.fetchData();
  }

  renderItem(rowData) {
    if(rowData){
      let ImageView = null, imgNum = Math.min(rowData.imageurls.length, 3);
      let Title = (
          <View><Text style={Style.title} numberOfLines={2}>{rowData.title || rowData.desc.replace(/\s+/g,"") || '最新闻'}</Text></View>
      );
      let Footer = (
        <View style={Style.itemFooter}>
          <Text style={Style.source}>{rowData.source}</Text>
          <Text style={Style.pubDate}>{rowData.pubDate}</Text>
        </View>
      );
      let _width = parseInt((width - 26)/3), _height = parseInt(_width * 0.8);
      let style_image = [null, Style.image][imgNum] || [Style.multiImage, {width: _width, height: _height }];
      let Images = rowData.imageurls.slice(0, imgNum).map((oUrl) => {
        return (<Image style={style_image} source={{uri: oUrl.url}}/>)
      });

      switch(imgNum){
        case 0:
          ItemView = (
            <View style={Style.item}>
              {Title}
              {Footer}
            </View>
          );
          break;
        case 1:
          ItemView = (
            <View style={[Style.item, Style.image_item]}>
              <View style={{flex: 1}}>
                {Title}
                {Footer}
              </View>
              {Images}
            </View>
          );
          break;
        default:
          ItemView = (
            <View style={Style.item}>
                {Title}
                <View style={[Style.multiImage_container, {height: _height}]}>
                  {Images}
                </View>
                {Footer}
            </View>
          );
          break;
      }

      return (
        <TouchableHighlight underlayColor={'rgba(0,0,0,0.05)'} style={{paddingHorizontal: 10}}
          onPress={(e) => this._pressItem(e, rowData)}
          key={rowData.nid}
        >
          {ItemView}
        </TouchableHighlight>
      );
    }
    return null;
  }
}
