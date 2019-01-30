import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = ({ text, press, imgSrc }) => (
    <TouchableOpacity onPress={press}>
        <View style={styles.listItem}>
            <Image style={styles.img} resizeMode={"contain"} source={imgSrc}/>
            <Text> {text} </Text>
        </View> 
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#eee',
        margin: 5,
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignItems: "center"
    },
    img:{
        width: 50,
        height: 30
    }
});

export default ListItem;