import React from 'react';
import {
    Image,
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

import next from './../../../resources/icons/next.png';

class UserItem extends React.Component {

    handleOnPress = () => {
        this.props.updateScreen(AppConstants.screens.USERPAGE, this.props);
    }

    render() {
        return (
            <View style = {styles.container}>
            <TouchableOpacity style={styles.container} onPress={this.handleOnPress}>
            <View style={styles.allInfo}>
            <View style={styles.info}>
            <Text style={styles.nameText}>{this.props.name}</Text>
            <Text style={styles.emailText}>{this.props.email}</Text>
            </View>
            <Image style={styles.icon} source={next}/>
            </View>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(13),
        marginBottom: responsiveHeight(3.5),
        alignItems: 'center'
    },
    nameText: {
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(4)
    },
    emailText: {
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(2)
    },
    allInfo: {
        flexDirection: 'row'
    },
    info: {
        justifyContent: 'center',
        width: responsiveWidth(80),
        height: responsiveHeight(13),
    },
    icon: {
        width: responsiveWidth(20),
        height: responsiveHeight(13),
    }
}

module.exports = UserItem;
