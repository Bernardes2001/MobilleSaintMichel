import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext';

export default function Footer() {
    const { darkMode } = useContext(ThemeContext);
    const estilos = getStyles(darkMode);

    return (
        <View style={estilos.viewP}>
            <View style={estilos.contentContainer}>
                <View style={estilos.logoContainer}>
                    <Image 
                        source={require('../../assets/Logo.png')} 
                        style={estilos.logo} 
                        tintColor={darkMode ? "#A5B4CB" : undefined}
                    />
                    <Text style={estilos.missao}>Cuidar de você é</Text>
                    <Text style={estilos.missao}>nossa missão divina</Text>
                </View>

                <View style={estilos.bottomSection}>
                    <View style={estilos.linhaDivisoria} />
                    
                    <View style={estilos.footerContent}>
                        <Image 
                            source={require('../../assets/libbs.png')} 
                            style={estilos.libbs}
                            tintColor={darkMode ? "#A5B4CB" : undefined}
                        />
                        
                        <View style={estilos.textContainer}>
                            <Text style={estilos.ano}>© 2025 Hospital's name All Rights Reserved</Text>
                            <Text style={estilos.anoD}>by PNTEC-LTD</Text>
                        </View>

                        <View style={estilos.socialIcons}>
                            <FontAwesome name="linkedin-square" size={24} style={estilos.icon} />
                            <FontAwesome name="facebook-square" size={24} style={estilos.icon} />
                            <FontAwesome name="instagram" size={24} style={estilos.icon} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const getStyles = (darkMode) => StyleSheet.create({
    viewP: {
        backgroundColor: darkMode ? '#1E1E2E' : '#1F2B6C',
    },
    contentContainer: {
        paddingVertical: 25,
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 80,
        resizeMode: 'contain',
    },
    missao: {
        color: darkMode ? '#D1DAEA' : '#FCFEFE',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 5,
    },
    bottomSection: {
        marginTop: 15,
    },
    linhaDivisoria: {
        height: 1,
        width: '100%',
        backgroundColor: darkMode ? '#3A3A4A' : '#3D5A80',
        marginBottom: 20,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    libbs: {
        width: 90,
        height: 50,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    ano: {
        color: darkMode ? '#B8C4D9' : '#FCFEFE',
        fontSize: 12.5,
        textAlign: 'center',
    },
    anoD: {
        color: darkMode ? '#B8C4D9' : '#FCFEFE',
        fontSize: 12.5,
        textAlign: 'center',
        marginTop: 5,
    },
    socialIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 15,
        color: darkMode ? '#A5B4CB' : '#FCFEFE',
    },
});