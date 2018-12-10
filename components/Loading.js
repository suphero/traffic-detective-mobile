import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
