import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Appearance } from "react-native";

export default function BodyHome() {
    const [darkMode, setDarkMode] = useState(false);
    
    // Verificar o tema do sistema ao carregar
    useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        setDarkMode(colorScheme === 'dark');
        
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setDarkMode(colorScheme === 'dark');
        });
        
        return () => subscription.remove();
    }, []);
    
    // Estilos dinâmicos baseados no tema
    const estilos = getStyles(darkMode);
    
    return (
        <ScrollView contentContainerStyle={estilos.scrollContainer}>
            <View style={estilos.viewBody}>
                {/* Botão para alternar modo escuro/claro */}
                <TouchableOpacity 
                    style={estilos.toggleButton}
                    onPress={() => setDarkMode(!darkMode)}
                >
                    <Text style={estilos.toggleButtonText}>
                        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
                    </Text>
                </TouchableOpacity>
                
                <Text style={estilos.titulo}>BEM-VINDO AO APP DO HOSPITAL SAINT-MICHEL</Text>
                
                <View style={estilos.viewT}>
                    <Text style={estilos.tituloDois}>CUIDAR DE VOCÊ</Text>
                    <Text style={estilos.tituloDois}>É A NOSSA MISSÃO</Text>
                    <Text style={estilos.tituloDois}>DIVINA</Text>
                </View>
                
                <Text style={estilos.descricao}>Com o aplicativo do Hospital Saint-Michel, você tem acesso a um atendimento de excelência na palma da mão.</Text>
                
                <View style={estilos.caixaApresentacao}>
                    <Text style={estilos.apresentacao}>🏥 No Hospital Saint-Michel, priorizamos a sua saúde e bem-estar. Nossa equipe altamente qualificada está pronta para oferecer atendimento humanizado, tecnologia de ponta e um ambiente acolhedor. Seja para consultas, exames ou emergências, estamos aqui para cuidar de você e da sua família com dedicação e compromisso.</Text>
                </View>
                
                <Text style={estilos.subtitulo}>Nossos Serviços:</Text>
                <View style={estilos.listaServicos}>
                    <Text style={estilos.servico}>🩺 Agende consultas e exames rapidamente.</Text>
                    <Text style={estilos.servico}>📋 Acompanhe seus resultados com segurança.</Text>
                    <Text style={estilos.servico}>🚑 Pronto atendimento e localização de unidades.</Text>
                    <Text style={estilos.servico}>💊 Receba prescrições e laudos digitalmente.</Text>
                    <Text style={estilos.servico}>👩‍⚕️ Telemedicina: consulte especialistas online.</Text>
                </View>
            </View>
        </ScrollView>
        
    );
}

// Função que retorna os estilos baseados no tema
const getStyles = (darkMode) => StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    },
    viewBody: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    viewT: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    titulo: {
        color: darkMode ? '#BFD2F8' : '#159EEC', // Azul claro no escuro, azul médio no claro
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    tituloDois: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C', // Azul claro no escuro, azul escuro no claro
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descricao: {
        fontSize: 18,
        textAlign: 'center',
        color: darkMode ? '#BFD2F8' : '#333333', // Azul claro no escuro, cinza escuro no claro
        marginVertical: 15,
    },
    caixaApresentacao: {
        backgroundColor: darkMode ? '#1F2B6C' : '#E8F0FE', // Azul escuro no escuro, azul claro claro no claro
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
    },
    apresentacao: {
        fontSize: 16,
        textAlign: 'center',
        color: darkMode ? '#BFD2F8' : '#1F2B6C', // Azul claro no escuro, azul escuro no claro
        fontWeight: '500',
    },
    subtitulo: {
        fontSize: 20,
        color: darkMode ? '#159EEC' : '#1F2B6C', // Azul médio no escuro, azul escuro no claro
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    listaServicos: {
        marginVertical: 15,
        alignItems: 'flex-start',
    },
    servico: {
        fontSize: 16,
        color: darkMode ? '#BFD2F8' : '#1F2B6C', // Azul claro no escuro, azul escuro no claro
        marginBottom: 5,
    },
    toggleButton: {
        backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
    },
    toggleButtonText: {
        color: darkMode ? '#BFD2F8' : '#FFFFFF',
        fontWeight: 'bold',
    },
});