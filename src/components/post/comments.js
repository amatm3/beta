import React from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import AppConstants from './../../core/constants.js';

class Comment extends React.Component {

    render() {
        return (
            <View style = {styles.container}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.emailText}>{this.props.email}</Text>
            <Text style={styles.comment}>{this.props.comment}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(15),
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
    },
    title: {
        marginLeft: responsiveHeight(2),
        fontSize: responsiveHeight(2)
    },
    emailText: {
        marginLeft: responsiveHeight(2),
        fontSize: responsiveHeight(1)
    },
    comment: {
        marginLeft: responsiveHeight(2),
        fontSize: responsiveHeight(1.5),
        fontWeight: 'bold'
    }
}

module.exports = Comment;
