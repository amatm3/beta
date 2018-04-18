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

class AlbumContent extends React.Component {

    handleOnPress = () => {
        this.props.updateScreen(AppConstants.screens.PHOTOS, this.props);
    }

    render() {
        return (
            <View style = {styles.container}>
            <TouchableOpacity style={styles.container} onPress={this.handleOnPress}>
            <Text style={styles.title}>{this.props.title}</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(10),
        marginTop: responsiveHeight(2),
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.5
    },
    title: {
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(2)
    }
}

module.exports = AlbumContent;
