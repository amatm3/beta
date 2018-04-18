const AppConstants = {
    screens: {
        HOME: 'home',
        POSTPAGE: 'post',
        USERPAGE: 'user',
        PHOTOS: 'photos',
        BACK_PRESSED: 'back_pressed'
    },
    NetworkErrors : {
        NO_NETWORK: 'no_network',
        INVALID_REQUEST_PARAMS: 'invalid_request_parameters',
        INVALID_RESPONSE_DATA: 'invalid_response_data',
        RESPONSE_PARSING_ERROR: 'response_parsing_error'
    },
    network_request_methods: {
        GET: 'GET'
    },
    network_types: {
        NONE: 'none',
        WIFI: 'wifi',
        MOBILE: 'mobile',
        UNKNOWN: 'unknown'
    },
    api_urls:{
        GET_USERS: 'https://jsonplaceholder.typicode.com/users',
        GET_ALBUMS: 'https://jsonplaceholder.typicode.com/albums',
        GET_PHOTOS: 'https://jsonplaceholder.typicode.com/photos',
        GET_POSTS: 'https://jsonplaceholder.typicode.com/posts',
        GET_COMMENTS: 'https://jsonplaceholder.typicode.com/comments',
        GET_TODOS: 'https://jsonplaceholder.typicode.com/todos'
    },
    DEFAULT_PHOTO_URL: 'https://www.colourmebronze.com.au/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noImage.jpg'
}

module.exports = AppConstants;
