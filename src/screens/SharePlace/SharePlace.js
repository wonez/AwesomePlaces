import React, { Component } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { addPlace, placeAddFinished } from '../../store/actions';
import { connect } from 'react-redux';

import PlacesInput from '../../components/PlacesInput/PlacesInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import TextButton from '../../components/UI/TextButton/TextButton';
import validate from '../../utility/validate';

class SharePlace extends Component{

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentWillMount(){
        this.resetForm();
    }

    navigationButtonPressed({ buttonId }) {
        if(buttonId === 'MenuBtnSharePlace'){
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
          });
        }
    }

    onChange = (value, field) => {
        this.setState(prevState => {
            return{
                ...prevState,
                form:{
                    ...prevState.form,
                    [field]:{
                        ...prevState.form[field],
                        touched: true,
                        valid: validate(this.state.form, value, prevState.form[field].rules),
                        value: field === 'place' ? value : {...value}
                    }
                }
            }
        })
    }

    resetForm = () => {
        this.setState({
            form:{
                place:{
                    value: '',
                    valid: false,
                    touched: false,
                    rules: {
                        minLength: 1
                    }
                },
                coordinates: {
                    value: {
                        latitude: null,
                        longitude: null
                    },
                    valid: false,
                    touched: false,
                    rules: {
                        location: true
                    }
                },
                image: {
                    value: null,
                    valid: false,
                    touched: false,
                    rules: {
                        image: true
                    }
                }
            }
        })
    }

    componentDidUpdate(){
        if(this.props.placeAdded){
            Navigation.mergeOptions(this.props.componentId, {
                bottomTabs: {
                    currentTabIndex: 0
                }
            })
            this.props.placeAddFinished();
        }
    }

    onAddPlace = () => {
        this.props.handleAdd(this.state.form.place.value, this.state.form.coordinates.value, this.state.form.image.value);
        this.resetForm();
        this.location.removeMarker();
    }

    render(){
        return(
            <ScrollView ref="scrollView">
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <StatusBar barStyle="light-content" />
                    <HeadingText>Share a Place with us!</HeadingText>
                    <PickImage onChangeImage={(value) => this.onChange(value, 'image')} image={this.state.form.image.value} />
                    <PickLocation ref={ref => this.location=ref} onChangeLocation={(value) => this.onChange(value, 'coordinates')}/>
                    <PlacesInput    placeholder="Place Name" 
                                    onFocus={ () => setTimeout(() => {this.refs.scrollView.scrollToEnd({animated: true})}, 100) }
                                    value={this.state.form.place.value}
                                    onChangeText={(value) => this.onChange(value, 'place')} />
                    {this.props.loading ? 
                        <ActivityIndicator size="small" color="#0000ff" /> : 
                        <TextButton onPress={this.onAddPlace} 
                                title="Share the Place!"
                                disabled={
                                    !this.state.form.place.valid || 
                                    !this.state.form.coordinates.valid ||
                                    !this.state.form.image.valid
                        } />}
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.uiReducer.loading,
        placeAdded: state.uiReducer.placeAdded
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleAdd: (place, coordinates, image) => { dispatch(addPlace(place, coordinates, image)) },
        placeAddFinished: () => {dispatch(placeAddFinished())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);