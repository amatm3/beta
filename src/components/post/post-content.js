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

class PostContent extends React.Component {

    handleOnPress = () => {
        this.props.updateScreen(AppConstants.screens.POSTPAGE, this.props);
    }

    render() {
        return (
            <View style = {styles.container}>
            <TouchableOpacity style={styles.container} onPress={this.handleOnPress}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.body}>{this.props.body}</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(15),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2)
    },
    title: {
        alignSelf: 'center',
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(2),
        fontWeight: 'bold'
    },
    body: {
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(1.5)
    }
}

module.exports = PostContent;
