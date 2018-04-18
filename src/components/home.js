
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import UserItem from './user/user-item.js';
import NetworkService from './../core/network.js';
import AppConstants from './../core/constants';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user_items: []
        }
    }

    async componentWillMount() {
        await NetworkService.makeAPIGetRequest(AppConstants.api_urls.GET_USERS).then(data => {
            if (!data){
                return this.setState({
                    user_items: []
                })
            }
            this.setState({
                user_items: data
            });
        }).catch(err => {
            console.log('err == ', err);
        });
    }


    renderUserItems = () => {
        if(!this.state.user_items.length)
        return null;

        return this.state.user_items.map((item, i) => {
            return (
                <UserItem
                key={i}
                updateScreen={this.props.updateScreen}
                name={item.name}
                email={item.email}
                id={item.id}
                user={item}
                />
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.user}>
            <Text style={styles.text}>USERS</Text>
            </View>
            <ScrollView >
            {this.renderUserItems()}
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    user: {
        marginBottom: responsiveHeight(2),
        backgroundColor: 'green',
        width: responsiveWidth(100),
        height: responsiveHeight(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize:responsiveHeight(3),
    }
});

module.exports = Home;
