import React from 'react';
import { View, Image, StyleSheet } from 'react-native'
import TextButton from '../UI/TextButton/TextButton';
import ImagePicker from 'react-native-image-crop-picker';

class PickImage extends React.Component {

    pickImageHandler = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(res => {
            if(res.path){
                const source = { uri: res.path, base64: res.data }
                this.props.onChangeImage(source);
            }
        })
    }

    render(){
        return(
            <View style={styles.cont}>
                <View style={styles.box}>
                        <Image  source={this.props.image} 
                                style={styles.img} />
                </View>
                <TextButton title="Pick Image" onPress={this.pickImageHandler} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont:{
        width: '100%',
        alignItems: 'center'
    },
    box:{
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#eee',
        width: '80%',
        height: 250
    },
    img:{
        width: '100%', 
        height: '100%'
    }
})

export default PickImage