import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

import { Navigation } from 'react-native-navigation';

import { itemDelete } from '../../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

class PlaceDetail extends React.Component {

    handleDelete = () => {
        this.props.handleDelete(this.props.selectedPlace.key)
        Navigation.pop(this.props.componentId);
    }

    render(){

        let placeData = null;

        if(this.props.selectedPlace){
            placeData = (
                <View>
                    <Image style={styles.img} resizeMode={'contain'} source={{uri: this.props.selectedPlace.imageUrl}}/>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...this.props.selectedPlace.coordinates,
                            latitudeDelta: 0.0122,
                            longitudeDelta: 
                                Dimensions.get('window').width / 
                                Dimensions.get('window').height * 0.0122,
                        }}
                    >
                        <Marker
                            coordinate={this.props.selectedPlace.coordinates}
                            title={this.props.selectedPlace.name}
                        />
                    </MapView>
                    <Text style={styles.heading}>{this.props.selectedPlace.name}</Text>
                </View>
            )
        }

        return(
            <ScrollView contentContainerStyle={styles.modal}>
                <View>
                    {placeData}
                </View>
                <View>
                    <View style={styles.delBox}>
                        <TouchableOpacity onPress={this.handleDelete} >
                            <Icon name="ios-trash" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 300
    },
    map:{
        width: '100%',
        height: 250,
        marginVertical: 5
    },
    modal:{
        padding: 20,
    },
    delBox:{
        alignItems: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

const mapDispatchToProps = (dispatch) => {
    return{
        handleDelete: (key) => { dispatch(itemDelete(key)) }
    }
} 

export default connect(null, mapDispatchToProps)(PlaceDetail);