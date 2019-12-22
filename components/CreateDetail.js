import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements'

class CreateDetail extends React.Component {
  checkedIcon = 'check-circle-o';
  checkedColor = '#ff0000';
  uncheckedColor = '#bfbfbf';

  defaultUncheckedIcon = 'circle-o';
  disableUncheckedIcon = 'times-circle-o';

  state = {
    checked: false,
    uncheckedIcon: this.defaultUncheckedIcon,
  }

  componentDidUpdate(nextProps) {
    if (nextProps.disableCheck) {
      this.setState({uncheckedIcon: this.disableUncheckedIcon});
    } else {
      this.setState({uncheckedIcon: this.defaultUncheckedIcon});
    }
  }

  render() {
    return (
      <CheckBox
        title={this.props.title}
        checkedIcon={this.checkedIcon}
        checkedColor={this.checkedColor}
        uncheckedIcon={this.state.uncheckedIcon}
        uncheckedColor={this.uncheckedColor}
        checked={this.state.checked}
        onPress={() => {
          if (this.props.disableCheck && !this.state.checked) return;
          const checked = !this.state.checked;
          this.setState({checked});
          this.props.onPress(checked);
        }}
      />
    )
  }
}

CreateDetail.propTypes = {
	title: PropTypes.string,
  disableCheck: PropTypes.bool
};

CreateDetail.defaultProps = {
	title: '',
  disableCheck: false
};

export default CreateDetail;
