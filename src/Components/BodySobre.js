import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ThemeContext } from '../ThemeContext';

const BodySobre = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const estilos = getStyles(darkMode);

  const abrirLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={estilos.container}>
    
      <View style={estilos.cabecalho}>
        <Image
          source={darkMode ? require('../../assets/Logo.png') : require('../../assets/LogoAzul.png')}
          style={estilos.logo}
        />
        <Text style={estilos.slogan}>Cuidar de você é nossa missão divina</Text>
      </View>

      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Sobre Nós</Text>
        <Text style={estilos.texto}>
          Bem-vindo ao Saint Michel, onde a sua saúde e bem-estar são a nossa prioridade. 
          Fundado com a missão de oferecer cuidados médicos de excelência, o Saint Michel 
          combina tecnologia avançada com um atendimento humanizado, garantindo que cada 
          paciente receba o melhor tratamento possível.
        </Text>
        <Text style={estilos.texto}>
          Nossa equipe é composta por profissionais altamente qualificados e dedicados, 
          que trabalham incansavelmente para proporcionar um ambiente acolhedor e seguro 
          para todos os nossos pacientes. Acreditamos que cuidar de você é uma missão divina, 
          e estamos comprometidos em oferecer um serviço que reflete esse compromisso.
        </Text>
        <Text style={estilos.texto}>
          No Saint Michel, você encontrará uma ampla gama de especialidades médicas, 
          equipamentos de última geração e um atendimento personalizado, tudo pensado 
          para garantir o seu conforto e a sua recuperação.
        </Text>
      </View>

      <View style={estilos.servicos}>
        <Text style={estilos.titulo}>Nossos Serviços</Text>
        <Text style={estilos.itemServico}>- Exames</Text>
        <Text style={estilos.itemServico}>- Acompanhamento Médico</Text>
        <Text style={estilos.itemServico}>- Emergência</Text>
        <Text style={estilos.itemServico}>- Atendimento Domiciliar</Text>
        <Text style={estilos.itemServico}>- Pequenas Cirurgias</Text>
        <Text style={estilos.itemServico}>- Cardiologia</Text>
        <Text style={estilos.itemServico}>- Dermatologia</Text>
        <Text style={estilos.itemServico}>- Ortopedia</Text>
        <Text style={estilos.itemServico}>- Pediatria</Text>
        <Text style={estilos.itemServico}>- Ginecologia</Text>
        <Text style={estilos.itemServico}>- Neurologia</Text>
        <Text style={estilos.itemServico}>- E todas as outras especialidades médicas</Text>
      </View>

      <View style={estilos.depoimentos}>
        <Text style={estilos.titulo}>Depoimentos</Text>
        <Text style={estilos.textoDepoimento}>
          "Excelente atendimento! Equipe muito profissional e atenciosa." - Maria S.
        </Text>
        <Text style={estilos.textoDepoimento}>
          "Melhor experiência hospitalar que já tive. Recomendo a todos!" - João P.
        </Text>
      </View>

      <View style={estilos.galeria}>
        <Text style={estilos.titulo}>Galeria</Text>
        <Image
          source={require('../../assets/hospital.jpeg')} 
          style={estilos.imagemGaleria}
        />
        <Image
          source={require('../../assets/recepcaoHospital.jpeg')} 
          style={estilos.imagemGaleria}
        />
      </View>

      <View style={estilos.mapaContainer}>
        <Text style={estilos.titulo}>Localização</Text>
        <MapView
          style={estilos.mapa}
          initialRegion={{
            latitude: -23.5505,
            longitude: -46.6333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: -23.5505, longitude: -46.6333 }}
            title="Saint Michel"
            description="Cuidar de você é nossa missão divina"
          />
        </MapView>
      </View>

      <View style={estilos.contato}>
        <Text style={estilos.titulo}>Contato</Text>
        <TouchableOpacity onPress={() => abrirLink('tel:+5511999999999')}>
          <Text style={estilos.linkContato}>Ligue para nós: (11) 99999-9999</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => abrirLink('mailto:contato@saintmichel.com')}>
          <Text style={estilos.linkContato}>Envie um e-mail: contato@saintmichel.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => abrirLink('https://www.saintmichel.com')}>
          <Text style={estilos.linkContato}>Visite nosso site: www.saintmichel.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: darkMode ? '#121212' : '#f9f9f9',
    padding: 20,
    paddingBottom: 40,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 18,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  conteudo: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: darkMode ? 0.1 : 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  servicos: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: darkMode ? 0.1 : 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  depoimentos: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: darkMode ? 0.1 : 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  galeria: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: darkMode ? 0.1 : 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  mapaContainer: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: darkMode ? 0.1 : 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  contato: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: darkMode ? 0.1 : 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    color: darkMode ? '#BFD2F8' : '#333333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  itemServico: {
    fontSize: 16,
    color: darkMode ? '#BFD2F8' : '#333333',
    lineHeight: 24,
    marginBottom: 10,
  },
  textoDepoimento: {
    fontSize: 16,
    color: darkMode ? '#BFD2F8' : '#333333',
    lineHeight: 24,
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  imagemGaleria: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  mapa: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  linkContato: {
    fontSize: 16,
    color: darkMode ? '#159EEC' : '#1F2B6C',
    lineHeight: 24,
    marginBottom: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    width: '40%',
  },
  toggleButtonText: {
    color: darkMode ? '#BFD2F8' : '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BodySobre;