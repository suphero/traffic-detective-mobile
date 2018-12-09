import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Report extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.plate}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 22,
    color: 'rgba(0,0,0,.8)',
    fontWeight: '300',
    fontSize: 16,
  },
})
