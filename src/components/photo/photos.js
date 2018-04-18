import React from 'react';
import {
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

import Photo from './photo.js';

class Photos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            photos: [],
        }
    }

    async componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        let query_params = {
            albumId: this.props.params.album.id
        }
        await NetworkService.makeAPIGetRequest(AppConstants.api_urls.GET_PHOTOS, {query_params: query_params}).then(data => {
            if (!data){
                return this.setState({
                    photos: []
                })
            }
            this.setState({
                photos: data
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
            from_screen: AppConstants.screens.PHOTOS
        });
        return true;
    }

    close() {
        if(this.state.vis=== true) {
            this.setState({
                vis: false
            });
    }
}

    renderPhotos() {
        return this.state.photos.map((item,i) => {
            return (
                <Photo
                key={i}
                title={item.title}
                thumbnail={item.thumbnailUrl}
                image={item.url}
                index={i}
                />
        );
    });

    }

    render() {
        return(
            <ScrollView>
            {this.renderPhotos()}
            </ScrollView>
        );

    }
}

module.exports = Photos;
