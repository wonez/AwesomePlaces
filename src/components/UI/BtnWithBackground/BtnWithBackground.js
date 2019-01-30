import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const BtnWithBackground = (props) => {

    let btn = (
        <TouchableOpacity onPress={props.onPress} style={[styles.btn, {backgroundColor: props.color}]} >
            <Text style={styles.text} >{props.title}</Text>
        </TouchableOpacity>
    )


    if(props.disabled){
        btn =  (
            <View style={[styles.btn, {backgroundColor: '#ccc'}]} >
                <Text style={styles.text} >{props.title}</Text>
            </View>
        )
    }

    return btn;
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        // backgroundColor: 'salmon',
        borderRadius: 5,
    },
    text: {
        color: 'white'
    }
})

export default BtnWithBackground;