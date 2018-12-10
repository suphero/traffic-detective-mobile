import React from 'react'
import { compose, graphql } from 'react-apollo'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ListView,
  ScrollView
} from 'react-native';
import CREATE_REPORT_MUTATION from '../graphql/createReport';
import DETAIL_TYPES_QUERY from '../graphql/detailTypes';
import FormMessage from '../components/FormMessage';
import CreateDetail from '../components/CreateDetail';
import Loading from '../components/Loading';

class CreateScreen extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      plate: '',
      details: [],
      error: '',
      dataSource: ds.cloneWithRows([])
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.detailTypes.loading && !nextProps.detailTypes.error) {
      const { dataSource } = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.detailTypes.report_detail_types),
      })
    }
  }

  render() {
    if (this.props.detailTypes.loading) {
      return <Loading/>
    }

    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.plateInput}
          placeholder="Plaka girin..."
          onChangeText={text => this.setState({ plate: text })}
          value={this.state.plate}
        />
        <FormMessage message={this.state.error}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={detail => (
            <CreateDetail title={detail.name} key={detail._id} type={detail._id}
              onPress={(type, checked) => this.handleDetailSelection(type, checked) }
            />
          )}
        />
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={() => this.props.onComplete()}
          >
            <Text style={styles.cancelButtonText}>Vazgeç</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => this._createReport()}
          >
            <Text style={styles.saveButtonText}>Raporla</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
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

  handleDetailSelection = (key, checked) => {
    let details = this.state.details;
    if (checked) {
      details.push(key);
    } else {
      var index = details.indexOf(key);
      if (index > -1) { details.splice(index, 1); }
    }
    this.setState({details});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#fff',
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

export default compose(
  graphql(CREATE_REPORT_MUTATION, { name: 'createReport' }),
  graphql(DETAIL_TYPES_QUERY, { name: 'detailTypes' }),
)(CreateScreen);
