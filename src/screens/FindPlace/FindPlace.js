import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, StyleSheet, Text, StatusBar, Animated } from 'react-native';
import { connect } from 'react-redux';
import { requestPlaces } from '../../store/actions'

import Icon from 'react-native-vector-icons/Ionicons';

import PlaceList from '../../components/PlacesList/PlacesList';
import TextButton from '../../components/UI/TextButton/TextButton'

class FindPlace extends Component{ 

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidAppear(){
        this.props.getPlaces();
    }

    state = {
        show: false,
        anim: new Animated.Value(1),
        anim2: new Animated.Value(0)
    }
    
    navigationButtonPressed({ buttonId }) {
        if(buttonId === 'MenuBtnFindPlace'){
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
          });
        }
    }

    handleShowing = () => {
        this.setState({ show: true });
        Animated.timing(
            this.state.anim2,
            {
                toValue: 1,
                duration: 500
            }
        ).start()
    }

    showHandler = () => {
        Animated.timing(                    
            this.state.anim,            
            {
              toValue: 0,                   
              duration: 500,              
            }
        ).start(() => {
            this.handleShowing();
        });   
    }

    handleItemSelect = (key) => {
        const place = this.props.places.find( place => {
            return place.key === key;  
        })
        Icon.getImageSource('ios-arrow-back', 30).then((icon) => {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'PlaceDetail',
                    passProps: {
                        selectedPlace: place
                    },
                    options:{
                        bottomTabs: {
                            visible: false,
                        },
                        topBar: {
                            title: {
                                text: place.name,
                                color: 'white'
                            },
                            background:{
                                color: 'rebeccapurple'
                            },
                            backButton:{
                                title: '',
                                color: 'gold',
                                icon: icon
                            }
                        }
                    }
                }
            });
        })
    } 
    
    render(){

        let content = (
            <Animated.View style={{
                opacity: this.state.anim,
                transform: [{
                    scale: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, 1]
                    })
                }]
            }}>
                <TextButton title="Show places" onPress={this.showHandler} />
            </Animated.View>
        )
        
        if(this.state.show){
            content = (    
                <Animated.View style={{ opacity: this.state.anim2 }}>
                        {this.props.places.length ? null : <Text style={styles.text}>Nothing to show</Text>}
                        <PlaceList places={this.props.places}  handleItemSelect={this.handleItemSelect}/>
                </Animated.View>
            )
        }
        
        return(
            <View style={styles.page}>
                <StatusBar barStyle="light-content" />
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    text: {
        textAlign: 'center'
    }
});

const mapStateToProps = (state) => {
    return{
        places: state.placeReducer.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPlaces: () => { dispatch(requestPlaces()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);