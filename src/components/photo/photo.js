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
import ImagePreview from 'react-native-image-preview'

class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vis: false
        }
    }

    handleOnPress = () => {
        this.props.updateScreen(AppConstants.screens.USERPAGE, this.props);
    }
    openImage() {
        this.setState({
            vis: true,
        })
    }

    setVisibleToFalse() {
        this.setState({
            vis: false
        })
    }

    render() {
        return (
            <View style = {styles.container}>
            <Text style={styles.title}>{this.props.title}</Text>
            <TouchableOpacity style={styles.image} onPress={() => {this.setState({vis: true});}}>
            <Image style={styles.image} source={{uri: this.props.thumbnail}}/>
            </TouchableOpacity>
            <ImagePreview visible={this.state.vis} source={{uri: this.props.image}} close={() => this.setVisibleToFalse()} />
            </View>
        );
    }
}

const styles = {
    container: {
        paddingLeft: responsiveWidth(10),
        width: responsiveWidth(60),
        height: responsiveWidth(45),
        marginTop: responsiveHeight(2),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    image: {
        width: responsiveWidth(33,3),
        height: responsiveWidth(33,3),
        marginTop: responsiveHeight(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginLeft: responsiveHeight(1),
        fontSize: responsiveHeight(2),
        fontWeight: 'bold'
    }
}

module.exports = Photo;
