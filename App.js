import React from 'react';

import Home from './src/components/home.js';
import Post from './src/components/post/post.js';
import UserPage from './src/components/user/user.js';
import Photos from './src/components/photo/photos.js';
import AppConstants from './src/core/constants.js';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            screens: [{
                name: AppConstants.screens.HOME,
                params: {}
            }],
        };

        this.renderers = {};
        this.renderers[AppConstants.screens.HOME] = this.renderHome;
        this.renderers[AppConstants.screens.USERPAGE] = this.renderUser;
        this.renderers[AppConstants.screens.PHOTOS] = this.renderPhotos;
        this.renderers[AppConstants.screens.POSTPAGE] = this.renderPost;
    }

    updateScreen = (screen, params) => {
        params = params || {};
        let screens = this.state.screens;
        if (screen == AppConstants.screens.BACK_PRESSED) {
            screens.pop();
        } else {
            if (screen == AppConstants.screens.HOME) {
                screens = [];
            }
            // removing cycles
            for (let ix = 0; ix < screens.length; ++ix) {
                if (screens[ix].name === screen) {
                    screens.splice(ix, 1);
                    break;
                }
            }

            if (!screens || !screens.length) {
                screens = [{name: screen, params: params}];
            }
            if (screens[screens.length - 1].name != screen) {
                screens.push({name: screen, params: params});
            }
        }

        this.setState({
            screens: screens
        });
    }

    render() {
        let screens = this.state.screens;
        let current_screen = {
            name: AppConstants.screens.HOME,
            params: null
        };
        if (screens && screens.length) {
            current_screen = screens[screens.length - 1];
        }

        return this.renderers[current_screen.name](current_screen.params);
    }

    renderHome = (params) => {
        return (
            <Home updateScreen={this.updateScreen} params={params} />
        );
    }

    renderUser = (params) => {
        return (
            <UserPage updateScreen={this.updateScreen} params={params} />
        );
    }

    renderPhotos = (params) => {
        return (
            <Photos updateScreen={this.updateScreen} params={params} />
        );
    }

    renderPost = (params) => {
        return (
            <Post updateScreen={this.updateScreen} params={params} />
        );
    }

}
