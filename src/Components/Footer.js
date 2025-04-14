import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Footer() {

    return (
        <View style={estilos.viewP}>
            <View>
                <Image source={require('../../assets/Logo.png')} style={estilos.logo} />
                <Text style={estilos.missao}>Cuidar de você é</Text>
                <Text style={estilos.missao}>nossa missão divina</Text>
            </View>

            <View style={estilos.viewF}>
                <Image source={require('../../assets/linha.png')} style={estilos.linha} />
                <Image source={require('../../assets/libbs.png')} style={estilos.libbs}/>

                <View style={estilos.viewBy}>
                    <Text style={estilos.ano}>© 2025 Hospital’s name All Rights Reserved </Text>
                    <Text style={estilos.anoD}>by PNTEC-LTD </Text>
                </View>

                <View style={estilos.viewImg}>
                    <FontAwesome name="linkedin-square" size={24} color="#FCFEFE" style={estilos.icon} />
                    <FontAwesome name="facebook-square" size={24} color="#FCFEFE" style={estilos.icon} />
                    <FontAwesome name="instagram" size={24} color="#FCFEFE" style={estilos.icon} />
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    viewP: {
        backgroundColor: '#1F2B6C',
    },
    logo: {
        marginLeft: 50,
    },
    missao: {
        color: '#FCFEFE',
        fontSize: 15,
        marginLeft: 35
    },
    linha: {
        marginTop: 10,
        width: '100%',
        height: 3.5
    },
    ano: {
        width: '100%',
        color: '#FCFEFE',
        fontSize: 12.5,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 80
    },
    anoD: {
        width: '100%',
        color: '#FCFEFE',
        fontSize: 12.5,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    viewImg: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
    icon: {
        marginHorizontal: 13
    },
    libbs: {
        marginLeft: 260,
        marginTop: -120,
        width: 90,
        height: 50
    }
});