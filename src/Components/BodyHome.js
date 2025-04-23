import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from '../ThemeContext';

export default function BodyHome() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const estilos = getStyles(darkMode);
    
    return (
        <ScrollView contentContainerStyle={estilos.scrollContainer}>
            <View style={estilos.viewBody}>
            
                
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
        width: '100%',
    },
    viewT: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    titulo: {
        color: darkMode ? '#BFD2F8' : '#159EEC',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    tituloDois: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descricao: {
        fontSize: 18,
        textAlign: 'center',
        color: darkMode ? '#BFD2F8' : '#333333',
        marginVertical: 15,
        lineHeight: 24,
    },
    caixaApresentacao: {
        backgroundColor: darkMode ? '#1F2B6C' : '#E8F0FE',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        width: '100%',
    },
    apresentacao: {
        fontSize: 16,
        textAlign: 'center',
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontWeight: '500',
        lineHeight: 22,
    },
    subtitulo: {
        fontSize: 20,
        color: darkMode ? '#159EEC' : '#1F2B6C',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    listaServicos: {
        marginVertical: 15,
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
    },
    servico: {
        fontSize: 16,
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        marginBottom: 10,
        lineHeight: 22,
    },
    toggleButton: {
        backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        alignSelf: 'center',
    },
    toggleButtonText: {
        color: darkMode ? '#BFD2F8' : '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});