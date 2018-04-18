import React from 'react';
import {Platform} from 'react-native';

import AppConstants from './constants.js'

class NetworkService extends React.Component {

    makeAPIRequest = (url, options) => {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.query_params = options.query_params || {};

            if (this.network_type === AppConstants.network_types.NONE) {
                return reject(AppConstants.NetworkErrors.NO_NETWORK);
            }
            if (!url) {
                return reject(AppConstants.NetworkErrors.INVALID_REQUEST_PARAMS);
            }
            if (options.query_params) {
                url += '?';
                Object.keys(options.query_params).forEach(el => {
                    if (!options.query_params[el]) return;
                    url += (el + '=' + options.query_params[el] + '&');
                });
            }
            if (!options.method) {
                options.method = AppConstants.network_request_methods.GET;
            }

            let fetch_options = {
                method: options.method,
                headers: options.headers || {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            if (options.headers) {
                fetch_options.headers = options.headers;
            }
            try {
                if (options.body) {
                    fetch_options.body = JSON.stringify(options.body);
                }
            } catch (ex) { return reject(AppConstants.NetworkErrors.INVALID_REQUEST_PARAMS); }
            fetch(url, fetch_options)
                .then((response) => {
                    return response.json();
                }).then((responseJson) => {
                    if (responseJson.error) {
                        return reject(response.more_info);
                    }
                    return resolve(responseJson);
                }).catch(err => {
                    console.log('err == ', err);
                    return reject(err);
            })
        });
    }

    makeAPIGetRequest = (url, options) => {
        if (!url) return null;
        options = options || {};
        return this.makeAPIRequest(url, options);
    }

}

module.exports = new NetworkService();
