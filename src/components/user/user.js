import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    BackHandler,
} from 'react-native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import NetworkService from './../../core/network.js';
import AppConstants from './../../core/constants';

import UserDetails from './user-details.js';
import AlbumContent from './../album/album-content.js';
import PostContent from './../post/post-content.js';
import CompletedListItem from './../to-do/completed-list-item.js';
import UnCompletedListItem from './../to-do/uncompleted-list-item.js'

class UserPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cont: '',
            album_items: [],
            post_items: [],
            to_do_list: [],
        }
    }

    async componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        await NetworkService.makeAPIGetRequest(AppConstants.api_urls.GET_ALBUMS).then(data => {
            if (!data){
                return this.setState({
                    album_items: []
                })
            }
            this.setState({
                album_items: data
            });

        }).catch(err => {
            console.log('err == ', err);
        });

        let query_params = {
            userId: this.props.params.user.id
        }
        await NetworkService.makeAPIGetRequest(AppConstants.api_urls.GET_POSTS,{query_params: query_params} ).then(data => {
            if (!data){
                return this.setState({
                    post_items: []
                })
            }
            this.setState({
                post_items: data
            });

        }).catch(err => {
            console.log('err == ', err);
        });

        await NetworkService.makeAPIGetRequest(AppConstants.api_urls.GET_TODOS,{query_params: query_params} ).then(data => {
            if (!data){
                return this.setState({
                    to_do_list: [],
                })
            }

            let to_du_completed = [];
            let to_do_uncompleted = [];
            data.forEach((item)=> {
                if(item.completed === true) {
                    to_du_completed.push(item)
                }
                else {
                    to_do_uncompleted.push(item);
                }
            });
            console.log(to_du_completed);
            let all_list = to_do_uncompleted.concat(to_du_completed);
            this.setState({
                to_do_list: all_list,
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
            from_screen: AppConstants.screens.USERPAGE
        });
        return true;
    }

    handleOnPressAlbums = () => {
        let buffer = [];
        for (var i = 0; i < this.state.album_items.length; i++) {
            if(this.state.album_items[i].userId === this.props.params.user.id) {
                buffer.push(this.state.album_items[i])
            }
        }
        this.setState({
            cont: 'albums',
            album_items: buffer
        });

    }

    handleOnPressPosts = () => {
        this.setState({
            cont: 'posts',
        });
    }

    handleOnPressToDo = () => {
        this.setState({
            cont: 'to_do',
        });
    }

    renderAlbumItems() {
        return this.state.album_items.map((item,i) => {
            return (
            <AlbumContent
            key={i}
            album={item}
            updateScreen={this.props.updateScreen}
            title={item.title}
            />
        );
    });
    }

    renderPostItems() {
        return this.state.post_items.map((item,i) => {
            return (
            <PostContent
            key={i}
            post={item}
            updateScreen={this.props.updateScreen}
            title={item.title}
            body={item.body}
            />
        );
    });
    }

    renderToDo() {
        let ident = true;
        return this.state.to_do_list.map((item,i) => {
            if(item.completed === false){
                return (
                    <UnCompletedListItem
                    key={i}
                    title={item.title}
                    completed={item.completed}
                    />
                );
            }
            if((item.completed === true) && (ident === true) ) {
                ident = false;
                return (
                    <View key={i}>
                    <Text style={styles.completed}>COMPLETED</Text>
                    <CompletedListItem

                    title={item.title}
                    completed={item.completed}
                    />
                    </View>
                );
            }
            return (
                <CompletedListItem
                key={i}
                title={item.title}
                completed={item.completed}
                />
            );
    });
    }

    renderContent() {
        let cont = this.state.cont;
        switch (cont) {
            case 'albums':
                return this.renderAlbumItems();
                break;
            case 'posts':
                return this.renderPostItems();
                break;
            case 'to_do':
                return (
                    <View Key={0}>
                    <Text style={styles.uncompleted} >UNCOMPLETED</Text>
                    {this.renderToDo()}
                    </View>
                );
                break;
        }
    }

    render(){
        return(
            <View>
            <UserDetails
            name={this.props.params.user.name}
            email={this.props.params.user.email}
            website={this.props.params.user.website}
            phone={this.props.params.user.phone}
            address={this.props.params.user.address}
            company={this.props.params.user.company}
            />
            <View style={styles.buttonsView}>
            <TouchableOpacity style={styles.button} onPress={this.handleOnPressAlbums}>
            <Text style={styles.buttonText}>Albums</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.handleOnPressPosts}>
            <Text style={styles.buttonText}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.handleOnPressToDo}>
            <Text style={styles.buttonText}>To Do</Text>
            </TouchableOpacity>
            </View>
            <ScrollView>
            {this.renderContent()}
            </ScrollView>
            </View>
        );
    }

}

const styles = {
    buttonsView: {
        marginTop: responsiveHeight(1),
        width: responsiveWidth(15),
        height: responsiveHeight(5),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        marginLeft: responsiveHeight(7),
        marginRight: responsiveHeight(5),
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(15),
        height: responsiveHeight(5),
        borderRadius: responsiveHeight(2),
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white'
    },
    completed: {
        fontSize: responsiveHeight(2),
        fontWeight: 'bold',
        color: 'green'
    },
    uncompleted: {
        fontSize: responsiveHeight(2),
        fontWeight: 'bold',
        color: 'red'
    }
}

export default UserPage;
