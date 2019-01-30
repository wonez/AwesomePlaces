import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

const TextButton = (props) => {
    
    let btn = (
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )

    if(props.disabled){
        btn = (
            <View style={styles.btn}>
                <Text style={[styles.text, styles.textDisabled]}>{props.title}</Text>
            </View>
        )
    }

    return btn;
}

const styles = StyleSheet.create({
    btn:{
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    text:{
        color: 'goldenrod',
        fontSize: 20
    },
    textDisabled:{
        color: '#ccc'
    }
});

export default TextButton;