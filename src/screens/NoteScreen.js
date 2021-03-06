import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { navigateTo } from '../actions';

class NoteScreen extends Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onNavigateTo: this.onNavigateTo.bind(this),
    });
  }

  onNavigateTo(path, params) {
    this.props.navigateTo(path, params);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Note',
      headerRight: (
        <View style={{ marginRight: 20 }}>
          <Ionicons
            name={'ios-search'}
            size={25}
            color={'white'}
            onPress={() => {
              if (navigation.state.params) {
                const params = navigation.state.params;
                if (params.onNavigateTo) {
                  const { onNavigateTo } = params;
                  return onNavigateTo('Search');
                }
              }
            }}
          />
        </View>
      ),
      headerLeft: (
        <View style={{ marginLeft: 20 }}>
          <Ionicons
            name={'ios-list'}
            size={35}
            color={'white'}
            onPress={() => {
              if (navigation.state.params) {
                const params = navigation.state.params;
                if (params.onNavigateTo) {
                  const { onNavigateTo } = params;
                  return onNavigateTo('DrawerToggle');
                }
              }
            }}
          />
        </View>
      ),
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.containerStyle}>
        <StatusBar barStyle="light-content" />
        <Button
          ref={c => {
            this.testRef = c;
          }}
          title={'Open Note'}
          onPress={() => {
            this.onNavigateTo('NoteModal', { title: 'Open' });
          }}
        />
        <Button
          title={'New Note'}
          onPress={() => {
            this.onNavigateTo('NoteModal', { title: 'New' });
          }}
        />
        <Button
          title={'Open Stack(Modal)'}
          onPress={() => {
            this.onNavigateTo('SimpleStack', { title: 'Simple Modal' });
          }}
        />
        <Button
          title={'Go to LoginPage'}
          onPress={() => {
            this.onNavigateTo('UnauthModal');
          }}
        />
      </SafeAreaView>
    );
  }
}

NoteScreen.propTypes = {
  navigation: PropTypes.object,
  navigateTo: PropTypes.func,
};

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default connect(null, { navigateTo })(NoteScreen);
