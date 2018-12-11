import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements'

class CreateDetail extends React.Component {
  disable = false;

  checkedIcon = 'check-circle-o';
  defaultUncheckedIcon = 'circle-o';
  defaultUncheckedColor = '#bfbfbf';

  limitUncheckedIcon = 'times-circle-o';
  limitUncheckedColor = '#ff0000';

  state = {
    checked: false,
    uncheckedIcon: this.defaultUncheckedIcon,
    uncheckedColor: this.defaultUncheckedColor
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disable) {
      this.setState({uncheckedIcon: this.limitUncheckedIcon, uncheckedColor: this.limitUncheckedColor});
    } else {
      this.setState({uncheckedIcon: this.defaultUncheckedIcon, uncheckedColor: this.defaultUncheckedColor});
    }
  }

  render() {
    return (
      <CheckBox
        title={this.props.title}
        checkedIcon={this.checkedIcon}
        uncheckedIcon={this.state.uncheckedIcon}
        uncheckedColor={this.state.uncheckedColor}
        checked={this.state.checked}
        onPress={() => {
          if (this.props.disable && !this.state.checked) return;
          const checked = !this.state.checked;
          this.setState({checked});
          this.props.onPress(this.props.type, checked);
        }}
      />
    )
  }
}

CreateDetail.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
  disable: PropTypes.bool
};

CreateDetail.defaultProps = {
	title: '',
	type: '',
  disable: false
};

export default CreateDetail;
