import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ThemeContext } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const BodySobre = () => {
  const { darkMode } = useContext(ThemeContext);
  const estilos = getStyles(darkMode);

  // Funções de interação
  const handleEmailPress = () => {
    Linking.openURL('mailto:saintmichelhospital@gmail.com?subject=Contato%20via%20App');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+551168181255');
  };

  const handleAddressPress = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=Av.%20Marechal%20Tito,%20340');
  };

  const handleInstagramPress = () => {
    Linking.openURL('instagram://user?username=hospital.saintmichel').catch(() => {
      Linking.openURL('https://www.instagram.com/hospital.saintmichel');
    });
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
      </View>

      <View style={estilos.servicos}>
        <Text style={estilos.titulo}>Nossos Serviços</Text>
        <Text style={estilos.itemServico}>- Exames</Text>
        <Text style={estilos.itemServico}>- Acompanhamento Médico</Text>
        <Text style={estilos.itemServico}>- Emergência</Text>
        <Text style={estilos.itemServico}>- Atendimento Domiciliar</Text>
        <Text style={estilos.itemServico}>- Pequenas Cirurgias</Text>
      </View>

      <View style={[estilos.mapaContainer, darkMode && estilos.mapaContainerDark]}>
        <Text style={estilos.titulo}>Localização</Text>
        <TouchableOpacity onPress={handleAddressPress}>
          <MapView
            style={estilos.mapa}
            initialRegion={{
              latitude: -23.4990,
              longitude: -46.4110,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              coordinate={{ latitude: -23.4990, longitude: -46.4110 }}
              title="Hospital Saint Michel"
              description="Av. Marechal Tito, 340"
            />
          </MapView>
          <Text style={estilos.enderecoTexto}>Av. Marechal Tito, 340 - São Paulo/SP</Text>
        </TouchableOpacity>
      </View>

      <View style={estilos.contato}>
        <Text style={estilos.titulo}>Contato</Text>
        
        <View style={estilos.contactInfo}>
          <TouchableOpacity onPress={handlePhonePress} style={estilos.contactItem}>
            <Ionicons name="call" size={20} color={estilos.contactIcon.color} />
            <Text style={estilos.contactText}>(11) 6818-1255</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleEmailPress} style={estilos.contactItem}>
            <Ionicons name="mail" size={20} color={estilos.contactIcon.color} />
            <Text style={estilos.contactText}>saintmichelhospital@gmail.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleInstagramPress} style={estilos.contactItem}>
            <Ionicons name="logo-instagram" size={20} color={estilos.contactIcon.color} />
            <Text style={estilos.contactText}>@hospital.saintmichel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: darkMode ? '#121212' : '#F5F5F5',
    paddingBottom: 30,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
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
    backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
    width: '90%',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  servicos: {
    backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
    width: '90%',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 22,
    color: darkMode ? '#FFFFFF' : '#1F2B6C',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  texto: {
    fontSize: 15,
    color: darkMode ? '#E0E0E0' : '#333333',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  itemServico: {
    fontSize: 15,
    color: darkMode ? '#E0E0E0' : '#333333',
    lineHeight: 24,
    marginBottom: 10,
  },
  mapaContainer: {
    width: '90%',
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapaContainerDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  enderecoTexto: {
    fontSize: 14,
    color: darkMode ? '#BBBBBB' : '#666666',
    textAlign: 'center',
    paddingVertical: 10,
  },
  contato: {
    backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
    width: '90%',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactInfo: {
    width: '100%',
    padding: 15,
    backgroundColor: darkMode ? '#252538' : '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: darkMode ? '#333344' : '#EEEEEE',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactIcon: {
    color: darkMode ? '#7A8BFF' : '#1F2B6C',
  },
  contactText: {
    fontSize: 15,
    color: darkMode ? '#E0E0E0' : '#444444',
    marginLeft: 12,
    flexShrink: 1,
  },
});

export default BodySobre;