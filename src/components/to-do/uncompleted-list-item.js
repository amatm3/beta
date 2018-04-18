import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import AppConstants from './../../core/constants.js';

class UnCompletedListItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.uncompleted}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(10),
    },
    uncompleted: {
        marginTop: responsiveHeight(0.5),
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(2)
    }
}

module.exports = UnCompletedListItem;
