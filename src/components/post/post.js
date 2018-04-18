import React from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import AppConstants from './../../core/constants.js';
import NetworkService from './../../core/network.js';

import Photo from './../photo/photo.js';
import Comment from './comments.js'

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
        }
    }

    async componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        let query_params = {
            postId: this.props.params.post.id
        };
        await NetworkService.makeAPIGetRequest(AppConstants.api_urls.GET_COMMENTS,{query_params: query_params}).then(data => {
            if (!data){
                return this.setState({
                    comments: []
                })
            }
            this.setState({
                comments: data
            });

        }).catch(err => {
            console.log('err == ', err);
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.updateScreen(AppConstants.screens.BACK_PRESSED, {
            from_screen: AppConstants.screens.POSTPAGE
        });
        return true;
    }

    renderPostComments() {
        return this.state.comments.map((item,i) => {
            return (
                <Comment
                key={i}
                name={item.name}
                email={item.email}
                comment={item.body}
                />
        );
    });
    }

    render() {
        return(
            <ScrollView>
            {this.renderPostComments()}
            </ScrollView>
        );

    }
}

const styles = {
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        marginTop: responsiveHeight(2),
        alignItems: 'center'
    },
}

module.exports = Post;
