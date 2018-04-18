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

class CompletedListItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.nameText}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(10),
        marginBottom: responsiveHeight(2)
    },
    nameText: {
        marginTop: responsiveHeight(0.5),
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(2)
    }
}

module.exports = CompletedListItem;
