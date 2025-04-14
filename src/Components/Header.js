import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Appearance } from "react-native";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        setDarkMode(colorScheme === 'dark');
        
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setDarkMode(colorScheme === 'dark');
        });
        
        return () => subscription.remove();
    }, []);

    const estilos = getStyles(darkMode);

    return (
        <View style={estilos.container}>
            {/* Botão de alternância de tema */}
            <TouchableOpacity 
                style={estilos.toggleButton}
                onPress={() => setDarkMode(!darkMode)}
            >
                <Text style={estilos.toggleButtonText}>
                    {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
                </Text>
            </TouchableOpacity>

            <View style={estilos.viewPrincipal}>
                <View style={estilos.viewUm}>
                    <Image 
                        source={require('../../assets/IconTelefone.png')} 
                        style={[estilos.IconT, { tintColor: darkMode ? "#BFD2F8" : null }]} 
                    />
                    <Text style={estilos.texto}>EMERGÊNCIA</Text>
                    <Text style={estilos.numero}>(11) 6818-1255</Text>
                </View>

                <View style={estilos.viewUm}>
                    <Image 
                        source={require('../../assets/IconLocal.png')} 
                        style={[estilos.IconL, { tintColor: darkMode ? "#BFD2F8" : null }]} 
                    />
                    <Text style={estilos.texto}>LOCALIZAÇÃO</Text>
                    <Text style={estilos.TextoDois}>Av. Marechal Tito, 340</Text>
                </View>
            </View>

            <View style={estilos.viewDois}>
                <Image 
                    source={require('../../assets/IconRelogio.png')} 
                    style={[estilos.iconR, { tintColor: darkMode ? "#BFD2F8" : null }]} 
                />
                <Text style={estilos.textoR}>HORÁRIO DE FUNCIONAMENTO</Text>
            </View>

            <Text style={estilos.TextoDoisH}>09:00 - 20:00 Todo dia</Text>
        </View>
    )
}

const getStyles = (darkMode) => StyleSheet.create({
    container: {
        backgroundColor: darkMode ? '#121212' : '#FFF',
    },
    viewPrincipal: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewUm: {
        marginTop: 48,
        flexDirection: 'row',
        alignItems: 'center'
    },
    IconT: {
        width: 30,
        height: 30,
        marginLeft: 1,
    },
    texto: {
        fontSize: 16,
        color: darkMode ? "#BFD2F8" : "#1F2B6C",
        marginLeft: 4,
    },
    numero: {
        color: "#159EEC",
        position: 'absolute',
        left: 35,
        top: 25,
    },
    IconL: {
        width: 30,
        height: 30,
        marginLeft: 1,
    },
    TextoDois: {
        color: "#159EEC",
        position: 'absolute',
        left: 35,
        top: 25,
    },
    viewDois: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    iconR: {
        width: 28,
        height: 28,
        marginRight: 5,
    },
    TextoDoisH: {
        color: "#159EEC",
        textAlign: 'center',
        marginTop: 5,
    },
    textoR: {
        fontSize: 16,
        color: darkMode ? "#BFD2F8" : "#1F2B6C",
    },
    // Estilo do botão de alternância
    toggleButton: {
        backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
        padding: 8,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: 'center',
        width: '50%',
    },
    toggleButtonText: {
        color: darkMode ? '#BFD2F8' : '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
});