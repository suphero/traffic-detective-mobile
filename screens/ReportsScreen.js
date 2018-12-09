import React from 'react'
import Report from '../components/Report'
import { graphql } from 'react-apollo'
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text,
} from 'react-native';
import CreateScreen from './CreateScreen';
import REPORTS_QUERY from '../graphql/reports';
import Loading from '../components/Loading';

class ReportsScreen extends React.Component {
  static navigationOptions = {
    title: 'Reports',
  };

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.reportsQuery.loading && !nextProps.reportsQuery.error) {
      const { dataSource } = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.reportsQuery.report_user),
      })
    }
  }

  render() {
    if (this.props.reportsQuery.loading) {
      return <Loading/>
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <CreateScreen
            onComplete={() => {
              this.props.reportsQuery.refetch()
              this.setState({ modalVisible: false })
            }}
          />
        </Modal>

        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={report => (
            <Report plate={report.plate} />
          )}
        />
        <TouchableHighlight
          style={styles.createReportButtonContainer}
          onPress={this._createReport}
        >
          <Text style={styles.createReportButton}>Create Report</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _createReport = () => {
    // this.props.router.push('/create');
    this.setState({ modalVisible: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  createReportButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createReportButton: {
    backgroundColor: 'rgba(39,174,96,1)',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  },
})

export default graphql(REPORTS_QUERY, {
  name: 'reportsQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(ReportsScreen)
