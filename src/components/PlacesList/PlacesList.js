import React from 'react';
import { FlatList, StyleSheet } from 'react-native'; 

import ListItem from './ListItem/ListItem';

const PlacesList = (props) => {

    return(
        <FlatList   
            style={styles.placesContainer}
            data={props.places}
            renderItem={place => {
                return(
                    <ListItem 
                        key={place.item.key} 
                        text={place.item.name} 
                        imgSrc={{uri: place.item.imageUrl}}
                        press={() => props.handleItemSelect(place.item.key)} />
                )
            }}
        />
    );
}

const styles = StyleSheet.create({
    placesContainer: {
		width: '100%',
        marginTop: 10,
	}
});

export default PlacesList;