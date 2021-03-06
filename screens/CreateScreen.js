import React from 'react'
import { compose, graphql } from 'react-apollo'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { List } from 'react-native-elements'
import CREATE_REPORT_MUTATION from '../graphql/createReport';
import DETAIL_TYPES_QUERY from '../graphql/detailTypes';
import FormMessage from '../components/FormMessage';
import CreateDetail from '../components/CreateDetail';
import Loading from '../components/Loading';
import { BackHandler } from 'react-native';

class CreateScreen extends React.Component {
  // componentDidMount() {
  //   if (this.props.report) {
  //     console.log(this.props.report)
  //   }
  // }

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      plate: '',
      details: [],
      error: '',
      disableDetail: false
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.onComplete();
    return true;
  }

  render() {
    if (this.props.detailTypes.loading) {
      return <Loading/>
    }

    return (
      <ScrollView style={styles.container} ref='_scrollView'>
        <TextInput
          style={styles.plateInput}
          placeholder="Plaka girin..."
          onChangeText={text => this.setState({ plate: text })}
          value={this.state.plate}
        />
        <FormMessage message={this.state.error}/>
        <List>
          {
            this.props.detailTypes.report_detail_types.map((detail) => (
              <CreateDetail title={detail.name} key={detail._id} type={detail._id} disableCheck={this.state.disableDetail}
              onPress={(checked) => this.handleDetailSelection(detail._id, checked) }
            />
            ))
          }
        </List>
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
      this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  handleDetailSelection = (type, checked) => {
    let details = this.state.details;
    if (checked) {
      details.push(type);
    } else {
      var index = details.indexOf(type);
      if (index > -1) { details.splice(index, 1); }
    }
    const disableDetail = details.length >= 3;
    this.setState({details, disableDetail});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
