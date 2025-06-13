import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Linking } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { ThemeContext } from '../ThemeContext';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

export default function ContainerContato() {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [assunto, setAssunto] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');
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
  
  const handleJobPress = () => {
    Linking.openURL('https://www.linkedin.com/in/saint-michael-hospital-47ab05359/');
  };

  const handleInstagramPress = () => {
    Linking.openURL('instagram://user?username=hospital.saintmichel').catch(() => {
      Linking.openURL('https://www.instagram.com/hospital.saintmichel');
    });
  };

  const handleSubmit = async () => {
    if (!nome || nome.trim().length < 3) {
      Alert.alert("Nome inválido", "Por favor, insira um nome com pelo menos 3 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      Alert.alert("E-mail inválido", "Por favor, insira um endereço de e-mail válido.");
      return;
    }

    if (!assunto || assunto.trim().length < 5) {
      Alert.alert("Assunto inválido", "O assunto deve ter pelo menos 5 caracteres.");
      return;
    }

    if (!mensagem || mensagem.trim().length < 10) {
      Alert.alert("Mensagem muito curta", "Por favor, escreva uma mensagem com pelo menos 10 caracteres.");
      return;
    }

    try {
      await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/contato', {
        nome: nome.trim(),
        email: email.trim(),
        assunto: assunto.trim(),
        mensagem: mensagem.trim(),
      });

      Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar:', error);
      Alert.alert('Erro', 'Não foi possível enviar sua mensagem. Por favor, tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.scrollView}>
      <View style={[estilos.mapaContainer, darkMode && estilos.mapaContainerDark]}>
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
      </View>

      <View style={estilos.formContainer}>
        <Text style={estilos.headerText}>ENTRE EM CONTATO</Text>
        <Text style={estilos.subtitleText}>Envie sua mensagem ou utilize nossos canais diretos</Text>

        <View style={estilos.inputRow}>
          <TextInput
            style={estilos.input}
            placeholder="Nome completo"
            placeholderTextColor={estilos.placeholderColor}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={estilos.input}
            placeholder="E-mail"
            placeholderTextColor={estilos.placeholderColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <TextInput
          style={estilos.inputSingle}
          placeholder="Assunto da mensagem"
          placeholderTextColor={estilos.placeholderColor}
          value={assunto}
          onChangeText={setAssunto}
        />

        <TextInput
          style={estilos.inputMessage}
          placeholder="Escreva sua mensagem aqui..."
          placeholderTextColor={estilos.placeholderColor}
          value={mensagem}
          onChangeText={setMensagem}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={estilos.submitButton} onPress={handleSubmit}>
          <Text style={estilos.submitButtonText}>ENVIAR MENSAGEM</Text>
        </TouchableOpacity>

        <View style={estilos.contactInfo}>
          <Text style={estilos.contactTitle}>OUTROS CANAIS DE CONTATO</Text>
          
          <TouchableOpacity onPress={handleAddressPress} style={estilos.contactItem}>
            <Ionicons name="location" size={20} color={estilos.contactIcon.color} />
            <Text style={estilos.contactText}>Av. Marechal Tito, 340 - São Paulo/SP</Text>
          </TouchableOpacity>
          
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

          <TouchableOpacity onPress={handleJobPress} style={estilos.contactItem}>
            <Ionicons name="logo-linkedin" size={20} color={estilos.contactIcon.color} />
            <Text style={estilos.contactText}>Saint Michael Hospital</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: darkMode ? '#121212' : '#F5F5F5',
    paddingBottom: 30,
  },
  mapaContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#FFFFFF',
  },
  mapaContainerDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mapa: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
    width: '90%',
    padding: 25,
    borderRadius: 15,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 22,
    color: darkMode ? '#FFFFFF' : '#1F2B6C',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: darkMode ? '#BBBBBB' : '#666666',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '400',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: darkMode ? '#333344' : '#DDDDDD',
    paddingHorizontal: 15,
    backgroundColor: darkMode ? '#252538' : '#FFFFFF',
    borderRadius: 8,
    color: darkMode ? '#E0E0E0' : '#333333',
    fontSize: 15,
  },
  inputSingle: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: darkMode ? '#333344' : '#DDDDDD',
    paddingHorizontal: 15,
    backgroundColor: darkMode ? '#252538' : '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    color: darkMode ? '#E0E0E0' : '#333333',
    fontSize: 15,
  },
  inputMessage: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: darkMode ? '#333344' : '#DDDDDD',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: darkMode ? '#252538' : '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: darkMode ? '#E0E0E0' : '#333333',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#1F2B6C',
    padding: 16,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  contactInfo: {
    width: '100%',
    padding: 20,
    backgroundColor: darkMode ? '#252538' : '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: darkMode ? '#333344' : '#EEEEEE',
  },
  contactTitle: {
    fontSize: 16,
    color: darkMode ? '#BBBBBB' : '#666666',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  placeholderColor: darkMode ? '#666677' : '#999999',
});