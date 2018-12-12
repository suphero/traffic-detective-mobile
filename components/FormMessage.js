import React from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	errorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	error: {
		marginRight: 10,
	},
});

const colors = { error: 'red', warning: 'yellow' };

const FormMessage = (props) => {
	const style = { color: colors[props.type] || colors.error };
	if (props.message) {
		return (
			<View style={styles.errorContainer}>
              	<Ionicons name="ios-warning" size={26} style={[styles.error, style]}  />
				<Text style={[styles.error, style]}>
					{props.message}
				</Text>
			</View>
		);
	} else {
		return null
	}
};

FormMessage.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
};

FormMessage.defaultProps = {
	type: 'error',
};

export default FormMessage;
