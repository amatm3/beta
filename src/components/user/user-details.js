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

class UserDetails extends React.Component {
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.name}>
            <Text style={styles.nameText}>{this.props.name}</Text>
            </View>
            <View style={styles.info}>
            <Text style={styles.infoText}>Email: {this.props.email}</Text>
            <Text style={styles.infoText}>Website: {this.props.website}</Text>
            <Text style={styles.infoText}>Company name: {this.props.company.name}</Text>
            <Text style={styles.infoText}>Company catchPhrase: {this.props.company.catchPhrase}</Text>
            <Text style={styles.infoText}>Company bs: {this.props.company.bs}</Text>
            <Text style={styles.infoText}>Address: {this.props.address.street} {this.props.address.suite} {this.props.address.city} Zip-Code: {this.props.address.zipcode}</Text>
            <Text style={styles.infoText}>Tel.: {this.props.phone}</Text>
            </View>
            </View>
        )
    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(30),
        backgroundColor: 'grey'
    },
    name: {
        alignItems: 'center',
        width: responsiveWidth(100),
        height: responsiveHeight(7),
    },
    nameText: {
        fontSize: responsiveHeight(5),
        color: 'white'
    },
    info: {
        marginLeft: responsiveWidth(2),
        width: responsiveWidth(100),
        height: responsiveHeight(23),
    },
    infoText: {
        fontSize: responsiveHeight(2,5)
    }
}

export default UserDetails;
