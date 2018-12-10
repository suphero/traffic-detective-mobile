import React from 'react'
import { graphql } from 'react-apollo'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import CREATE_REPORT_MUTATION from '../graphql/createReport';
import FormMessage from '../components/FormMessage';

class CreateScreen extends React.Component {
  state = {
    plate: '',
    details: ['HORN', 'FAST'],
    error: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.plateInput}
          placeholder="Type Plate..."
          onChangeText={text => this.setState({ plate: text })}
          value={this.state.plate}
        />
        <FormMessage message={this.state.error}/>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={() => this.props.onComplete()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => this._createReport()}
          >
            <Text style={styles.saveButtonText}>Create Report</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  _createReport = async () => {
    try {
      const { plate, details } = this.state
      this.setState({error: ''});
      await this.props.createReport({
        variables: { plate, details },
      })
      this.props.onComplete()
    } catch (e) {
      this.setState({error: e.message});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  addImageContainer: {
    backgroundColor: 'rgba(0,0,0,.03)',
  },
  addImage: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  photoPlaceholderContainer: {
    alignItems: 'center',
    height: 80,
  },
  photoPlaceholder: {
    backgroundColor: 'rgba(42,126,211,.1)',
    height: 80,
    width: 80,
  },
  plateInput: {
    paddingHorizontal: 20,
    height: 100,
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,174,96,1)',
    height: 45,
    borderRadius: 2,
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  cancelButtonText: {
    color: 'rgba(0,0,0,.5)',
  },
})


export default graphql(CREATE_REPORT_MUTATION, {
  name: 'createReport',
})(CreateScreen)
