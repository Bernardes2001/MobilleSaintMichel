
import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemeContext } from '../ThemeContext';

export default function Banner() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <View style={estilos.container}>
            <Image 
                source={darkMode 
<<<<<<< HEAD
                    ? require('../../assets/NossosMedicosDark.png') 
=======
                    ? require('../../assets/nossosMedicosDark.png') 
>>>>>>> 15a1d6196f7b632f32cb549f241a11d7ec18378d
                    : require('../../assets/nossosMedicos.png')} 
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
        height: 90,
    }
});