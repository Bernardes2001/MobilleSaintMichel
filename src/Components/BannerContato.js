import React from "react";
import { Image, StyleSheet, View } from "react-native";

    export default function BannerContato() {

        return (
            <View>
                <Image source={require('../../assets/bannerContatos.png')} style={estilos.img}/>
            </View>
        )
    }

    const estilos = StyleSheet.create({
        img: {
            width: '100%',
            height: 92
        }
    })