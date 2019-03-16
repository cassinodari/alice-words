import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './components/Logo';
// import Loader from './components/Loader';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        {/* <Loader /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
