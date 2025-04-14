import React from "react";
import { Image, StyleSheet, View } from "react-native";

    export default function BannerDoutores() {

        return (
            <View>
                <Image source={require('../../assets/nossosMedicos.png')} style={estilos.img}/>
            </View>
        )
    }

    const estilos = StyleSheet.create({
        img: {
            width: '100%',
            height: 92
        }
    })