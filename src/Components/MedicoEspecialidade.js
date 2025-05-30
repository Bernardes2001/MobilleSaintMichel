import React, { useEffect, useState, useRef, useContext } from "react";
import {
    Image,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Animated,
    TextInput
} from "react-native";
import { ThemeContext } from '../ThemeContext';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const especialidades = [
    "Todos", "Cardiologista", "Dermatologista", "Gastroenterologista",
    "Ginecologista", "Nefrologista", "Neurologista", "Oftalmologista",
    "Oncologista", "Ortopedista", "Otorrinolaringologista", "Pneumologista", "Urologista"
];

export default function MedicoEspecialidade() {
    const [medico, setMedico] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [filtro, setFiltro] = useState("Todos");
    const [pesquisa, setPesquisa] = useState("");
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const scrollX = useRef(new Animated.Value(0)).current;
    const estilos = getStyles(darkMode);

    const medicosFiltrados = medico.filter(medico => {
        const nomeMatch = medico.nome_completo.toLowerCase().includes(pesquisa.toLowerCase());
        const especialidadeMatch = (filtro === "Todos" || medico.especialidade === filtro) &&
            medico.especialidade.toLowerCase().includes(pesquisa.toLowerCase());

        return (filtro === "Todos" || medico.especialidade === filtro) &&
            (nomeMatch || especialidadeMatch);
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false,
            listener: event => {
                const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                setActiveIndex(index);
            }
        }
    );

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:5000/medico');
                setMedico(response.data); // Resposta é um array de médicos
            } catch (error) {
                console.error("Erro ao buscar médicos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicos();
    }, []);

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={estilos.container}>

            <TextInput
                style={estilos.inputFiltro}
                placeholder="Pesquisar especialidade"
                placeholderTextColor={estilos.placeholderColor}
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

            {medicosFiltrados.length > 0 ? (
                <>
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
                                    <Image
                                        source={{ uri: `http://10.0.2.2:5000${medico.foto}` }}
                                        style={estilos.medicoImage}
                                    />
                                    <View style={estilos.medicoInfo}>
                                        <Text style={estilos.medicoNome}>{medico.nome_completo}</Text>
                                        <Text style={estilos.medicoEspecialidade}>{medico.especialidade}</Text>
                                        <View style={estilos.socialIcons}>
                                            <Image
                                                source={require('../../assets/linkedinDois.png')}
                                                style={estilos.socialIcon}
                                            />
                                            <Image
                                                source={require('../../assets/faceDois.png')}
                                                style={estilos.socialIcon}
                                            />
                                            <Image
                                                source={require('../../assets/instaDois.png')}
                                                style={estilos.socialIcon}
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={estilos.profileButton}>
                                        <Text style={estilos.profileButtonText}>Visualizar Perfil</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={estilos.indicadorContainer}>
                        {medicosFiltrados.map((_, index) => (
                            <View
                                key={index}
                                style={[estilos.indicador, activeIndex === index && estilos.indicadorAtivo]}
                            />
                        ))}
                    </View>
                </>
            ) : (
                <View style={estilos.noResults}>
                    <Text style={estilos.noResultsText}>Nenhum médico encontrado</Text>
                </View>
            )}
        </View>
    );
}


const getStyles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkMode ? '#121212' : '#FFFFFF',
        paddingBottom: 20,
    },
    inputFiltro: {
        height: 40,
        borderColor: darkMode ? '#1E1E2E' : '#CCCCCC',
        borderWidth: 1,
        margin: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
        color: darkMode ? '#1E1E2E' : '#000000',
        fontSize: 16,
    },
    placeholderColor: darkMode ? '#BFD2F8' : '#666666',
    filtroContainer: {
        height: 50,
        marginBottom: 10,
    },
    filtroContent: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    filtroBotao: {
        backgroundColor: darkMode ? '#1E1E2E' : '#F0F0F0',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5,
        height: 35,
        justifyContent: 'center',
    },
    filtroBotaoAtivo: {
        backgroundColor: darkMode ? '#BFD2F8' : '#1F2B6C',
    },
    filtroTexto: {
        color: darkMode ? '#BFD2F8' : '#333333',
        fontSize: 14,
    },
    filtroTextoAtivo: {
        color: darkMode ? '#1F2B6C' : '#FFFFFF',
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: 10,
    },
    cardContainer: {
        width: screenWidth,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
        elevation: 5,
        shadowColor: darkMode ? '#000' : '#1F2B6C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    medicoImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    medicoInfo: {
        padding: 20,
        alignItems: 'center',
    },
    medicoNome: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    medicoEspecialidade: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontSize: 20,
        marginBottom: 15,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginHorizontal: 15,
        tintColor: darkMode ? '#BFD2F8' : '#1F2B6C',
    },
    profileButton: {
        backgroundColor: darkMode ? '#BFD2F8' : '#1F2B6C',
        padding: 15,
        alignItems: 'center',
    },
    profileButtonText: {
        color: darkMode ? '#1F2B6C' : '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    indicadorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    indicador: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: darkMode ? '#555555' : '#CCCCCC',
        marginHorizontal: 5,
    },
    indicadorAtivo: {
        backgroundColor: darkMode ? '#BFD2F8' : '#1F2B6C',
    },
    noResults: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        fontSize: 18,
    },
    toggleButton: {
        backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
        padding: 12,
        borderRadius: 25,
        margin: 15,
        alignSelf: 'center',
        width: '40%',
        elevation: 3,
    },
    toggleButtonText: {
        color: darkMode ? '#BFD2F8' : '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});