import React from 'react'
import { compose, graphql } from 'react-apollo'
import {
  Button,
  Modal,
  StyleSheet,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import CreateScreen from './CreateScreen';
import REPORTS_QUERY from '../graphql/reports';
import DELETE_REPORT_MUTATION from '../graphql/deleteReport';
import Loading from '../components/Loading';

class ReportsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Raporlarım',
      headerRight: (
        <Button
          onPress={() => navigation.state.params._createReport()}
          title="Ekle"
        />
      ),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ _createReport: this._createReport });
  }

  render() {
    if (this.props.reportsQuery.loading) {
      return <Loading/>
    }

    return (
      <ScrollView style={styles.container}>
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
        <List>
          {
            this.props.reportsQuery.report_user.map((item) => (
              <ListItem
                key={item._id}
                title={item.plate}
                rightIcon={{name: 'delete'}}
                onPressRightIcon={() => this.deleteReport(item._id)}
              />
            ))
          }
        </List>
      </ScrollView>
    )
  }

  _createReport = () => {
    // this.props.router.push('/create');
    this.setState({ modalVisible: true })
  }

  deleteReport = async(_id) => {
    await this.props.deleteReport({
      variables: { _id },
    });
    this.props.reportsQuery.refetch()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default compose(
  graphql(DELETE_REPORT_MUTATION, { name: 'deleteReport' }),
  graphql(REPORTS_QUERY, { name: 'reportsQuery' }),
)(ReportsScreen);
