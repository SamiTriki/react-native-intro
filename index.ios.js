/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/components/Main');
var OfficeFinder = require('./app/components/OfficeFinder');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TabBarIOS
} = React;

class oeuf extends React.Component{
  constructor(){
    super();
    this.statics = {
      title: '<TabBarIOS>',
      description: 'Tab-based navigation.'
    };
    this.displayName =  'TabBarExample';

    this.state = {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0
    }
  }
  _renderContent(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }
  changeTab(tab){
    this.setState({selectedTab: tab})
  }
  render() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="black" transluscent="true">
        <TabBarIOS.Item
          systemIcon="more"
          title="Github Search"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={this.changeTab.bind(this, 'blueTab')}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Github Notetaker',
              component: Main

            }} 
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={this.changeTab.bind(this, 'redTab')}>
          <OfficeFinder />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={this.changeTab.bind(this, 'greenTab')}
        >
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
};

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111',
    marginBottom:46
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('oeuf', () => oeuf);
