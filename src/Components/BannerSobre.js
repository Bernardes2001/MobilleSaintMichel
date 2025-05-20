import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeContext } from '../ThemeContext';

export default function Banner() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <View style={estilos.container}>
            <Image 
                source={darkMode 
                    ? require('../../assets/sobreDark.png') 
                    : require('../../assets/sobre.png')} 
                style={estilos.img}
                resizeMode="cover"
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden',
    },
    img: {
        width: "100%",
        height: 100,
    }
});