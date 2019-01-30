import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { logout } from '../../store/actions/index'

import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons';

class SideMenu extends Component {

    logout = () => {
        this.props.logout();
    }

    render(){
        return(
            <View style={styles.menu}>
                <TouchableOpacity onPress={this.logout}>
                    <View style={styles.btn}>
                        <Icon name="ios-log-out" size={30} color="gold" />
                        <Text style={styles.text} >Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        paddingTop: 50,
        backgroundColor: 'rebeccapurple',
        height: "100%"
    },
    btn: {
        backgroundColor: '#845BAD',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        paddingLeft: 20,
        color: 'gold'
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(SideMenu);