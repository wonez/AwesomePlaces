import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import TextButton from '../UI/TextButton/TextButton';

class PickLocation extends React.Component {

    state = {
        initialRegion:{
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: 
                Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
            selected: false
        }
    }

    removeMarker = () => {
        this.setState(prevState => ({
            ...prevState,
            initialRegion: {
                ...prevState.initialRegion,
                selected: false
            }
        })) 
    }

    pressHandler = data => {
        const cords = data.nativeEvent.coordinate;
        this.setState(prevState => {
            return{
                ...prevState,
                initialRegion: {
                    ...prevState.initialRegion,
                    latitude: cords.latitude,
                    longitude: cords.longitude,
                    selected: true
                }
            }
        })
        this.map.animateToRegion({
            ...this.state.initialRegion,
            latitude: cords.latitude,
            longitude: cords.longitude
        })
        this.props.onChangeLocation({
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude
        });
    }

    locateMeHandler = () => {
        navigator.geolocation.getCurrentPosition(res => {
            const data = {
                nativeEvent: {
                    coordinate: {
                        ...res.coords
                    }
                }
            }
            console.log(res);
            this.pressHandler(data);
        }, err => {
            console.log(err);
            alert('Something went wrong while locating.')
        })
    }

    render(){

        let marker = null;
        if(this.state.initialRegion.selected){
            marker = <Marker coordinate={this.state.initialRegion}/>
        }

        return(
            <View style={styles.cont}>
                <MapView 
                    style={styles.map}
                    onPress={this.pressHandler}
                    ref={ ref => this.map = ref }
                    initialRegion={this.state.initialRegion}>
                    {marker}
                </MapView>
                <TextButton title="Locate Me" onPress={this.locateMeHandler} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont:{
        width: '100%',
        alignItems: 'center'
    },
    map:{
        width: '100%',
        height: 250
    }
})

export default PickLocation