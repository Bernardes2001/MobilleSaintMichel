import React, { useRef, useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, Animated, TextInput, Appearance } from "react-native";

const screenWidth = Dimensions.get('window').width;

const medicos = [
    { nome: "Dr. Flávio", especialidade: "Neurologista", imagem: require('../../assets/medicoNeuro.png') },
    { nome: "Dra. Carla", especialidade: "Cardiologista", imagem: require('../../assets/medicoCardio.png') },
    { nome: "Dr. Pedro", especialidade: "Ortopedista", imagem: require('../../assets/medicoOrtop.png') },   
];

const especialidades = ["Todos", "Cardiologista", "Dermatologista", "Gastroenterologista", "Ginecologista", "Nefrologista", "Neurologista",
                        "Oftalmologista", "Oncologista", "Ortopedista", "Otorrinolaringologista", "Pneumologista", "Urologista",
];

export default function MedicoEspecialidade() {
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [filtro, setFiltro] = useState("Todos");
    const [pesquisa, setPesquisa] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const colorScheme = Appearance.getColorScheme();
        setDarkMode(colorScheme === 'dark');
        
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setDarkMode(colorScheme === 'dark');
        });
        
        return () => subscription.remove();
    }, []);

    const medicosFiltrados = medicos.filter(medico =>
        (filtro === "Todos" || medico.especialidade === filtro) &&
        medico.especialidade.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false, listener: event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveIndex(index);
        }}
    );

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

            <TextInput
                style={estilos.inputFiltro}
                placeholder="Pesquisar especialidade"
                placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
                value={pesquisa}
                onChangeText={setPesquisa}
            />
            
            <View style={estilos.filtroContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={estilos.filtroContent}
                >
                    {especialidades.map((esp, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[estilos.filtroBotao, filtro === esp && estilos.filtroBotaoAtivo]}
                            onPress={() => setFiltro(esp)}
                        >
                            <Text style={[estilos.filtroTexto, filtro === esp && estilos.filtroTextoAtivo]}>
                                {esp}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            
            <ScrollView 
                ref={scrollViewRef}
                horizontal 
                showsHorizontalScrollIndicator={false} 
                pagingEnabled 
                style={estilos.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {medicosFiltrados.map((medico, index) => (
                    <View key={index} style={estilos.cardContainer}>
                        <View style={estilos.card}>
                            <Image source={medico.imagem} style={estilos.imgNeuro} />
                            <View style={estilos.nomesCard}>
                                <Text style={estilos.nomeDr}>{medico.nome}</Text>
                                <Text style={estilos.especialidade}>{medico.especialidade}</Text>
                                <View style={estilos.viewImg}>
                                    <Image source={require('../../assets/linkedinDois.png')} style={estilos.linkedin} />
                                    <Image source={require('../../assets/faceDois.png')} style={estilos.face} />
                                    <Image source={require('../../assets/instaDois.png')} style={estilos.insta} />
                                </View>
                            </View>
                            <View style={estilos.viewVizu}>
                                <Text style={estilos.vizu}>Visualizar Perfil</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            
            <View style={estilos.indicadorContainer}>
                {medicosFiltrados.map((_, index) => (
                    <View key={index} style={[estilos.indicador, activeIndex === index && estilos.indicadorAtivo]} />
                ))}
            </View>

            <View style={estilos.viewVazia} />
        </View>
    );
}

const getStyles = (darkMode) => StyleSheet.create({
    container: {
        backgroundColor: darkMode ? '#121212' : '#FFF',
        minHeight: '100%',
    },
    inputFiltro: {
        height: 40,
        borderColor: darkMode ? '#159EEC' : '#ccc',
        borderWidth: 1,
        margin: 10,
        paddingLeft: 8,
        borderRadius: 5,
        backgroundColor: darkMode ? '#1F2B6C' : '#FFF',
        color: darkMode ? '#BFD2F8' : '#000',
    },
    filtroContainer: {
        height: 40, // Altura fixa para o container
        marginBottom: 10,
    },
    filtroContent: {
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    filtroBotao: {
        backgroundColor: darkMode ? '#1F2B6C' : '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 6, // Reduzido o padding vertical
        borderRadius: 20,
        marginHorizontal: 5,
        height: 32, // Altura fixa para os botões
        justifyContent: 'center',
    },
    filtroBotaoAtivo: {
        backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
    },
    filtroTexto: {
        color: darkMode ? '#BFD2F8' : '#000',
        fontSize: 14,
    },
    filtroTextoAtivo: {
        color: darkMode ? '#1F2B6C' : '#FFF',
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: 10,
    },
    cardContainer: {
        width: screenWidth,
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        alignItems: 'center',
        width: '80%',
    },
    imgNeuro: {
        width: '100%',
        height: 350,
        resizeMode: 'contain',
    },
    nomesCard: {
        backgroundColor: darkMode ? '#1F2B6C' : '#BFD2F8',
        width: '100%',
        alignItems: 'center',
        height: 140,
    },
    nomeDr: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontSize: 25,
        marginTop: 15,
    },
    especialidade: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontSize: 22,
        marginTop: -5,
    },
    viewImg: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center'
    },
    linkedin: {
        height: 24,
        width: 24,
        marginRight: 13,
        tintColor: darkMode ? '#BFD2F8' : null,
    },
    face: {
        height: 24,
        width: 24,
        tintColor: darkMode ? '#BFD2F8' : null,
    },
    insta: {
        height: 24,
        width: 24,
        marginLeft: 13,
        tintColor: darkMode ? '#BFD2F8' : null,
    },
    viewVizu: {
        backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
        width: '100%',
        alignItems: 'center',
        height: 45,
        borderRadius: 4,
        marginTop: -1,
    },
    vizu: {
        color: darkMode ? '#1F2B6C' : '#BFD2F8',
        marginTop: 11,
        fontSize: 15,
        fontWeight: 'bold',
    },
    indicadorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    indicador: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: darkMode ? '#555' : '#ccc',
        marginHorizontal: 4,
    },
    indicadorAtivo: {
        backgroundColor: darkMode ? '#BFD2F8' : '#1F2B6C',
        width: 8,
        height: 8,
    },
    viewVazia: {
        marginTop: 20,
        backgroundColor: darkMode ? '#121212' : '#FFF',
    },
    toggleButton: {
        backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
        padding: 10,
        borderRadius: 20,
        margin: 10,
        alignSelf: 'center',
        width: '35%',
    },
    toggleButtonText: {
        color: darkMode ? '#BFD2F8' : '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});