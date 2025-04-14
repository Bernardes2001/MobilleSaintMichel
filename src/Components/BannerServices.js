import React from "react";
import { Image, StyleSheet, View } from "react-native";

    export default function BannerServices() {

        return (
            <View>
                <Image source={require('../../assets/nossosServicos.png')} style={estilos.img}/>
            </View>
        )
    }

    const estilos = StyleSheet.create({
        img: {
            width: '100%',
            height: 92
        }
    })