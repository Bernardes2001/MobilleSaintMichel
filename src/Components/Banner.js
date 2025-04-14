import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";



    export default function Banner() {

        return (
            <View>
                <Image source={require('../../assets/bannerHome.png')} style={estilos.img}/>
            </View>
        )
    }

    const estilos = StyleSheet.create({
        img: {
            width: "100%",
            height: 135
        }
    })