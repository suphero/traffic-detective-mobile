import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements'

class CreateDetail extends React.Component {
  state = {
    checked: false
  }

  render() {
    return (
        <CheckBox
            title={this.props.title}
            checked={this.state.checked}
            onPress={() => {
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
};

CreateDetail.defaultProps = {
	title: '',
	type: '',
};

export default CreateDetail;
