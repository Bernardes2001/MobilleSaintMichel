import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Appearance } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default function ContainerContato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
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
    <ScrollView contentContainerStyle={estilos.scrollView}>
      {/* Botão de alternância de tema */}
     
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
          title={"Av. Marechal Tito, 340"}
          description={"Localização do endereço"}
        />
      </MapView>
      <TouchableOpacity 
        style={estilos.toggleButton}
        onPress={() => setDarkMode(!darkMode)}
      >
        <Text style={estilos.toggleButtonText}>
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </Text>
      </TouchableOpacity>
      <View style={estilos.viewP}>
        <Text style={estilos.texto1}>ENTRE EM CONTATO</Text>
        <Text style={estilos.texto2}>Contato</Text>
        <View style={estilos.container}>
          <TextInput
            style={estilos.input}
            placeholder="Nome"
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={estilos.input}
            placeholder="Email"
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TextInput
          style={estilos.inputA}
          placeholder="Assunto"
          placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          value={assunto}
          onChangeText={setAssunto}
        />
        <TextInput
          style={estilos.inputM}
          placeholder="Mensagem"
          placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />
        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>Enviar</Text>
        </TouchableOpacity>
        <View style={estilos.infoAdicional}>
          <Text style={estilos.textoInfo}>Endereço: Av. Marechal Tito, 340</Text>
          <Text style={estilos.textoInfo}>Telefone: (11) 6818-1255</Text>
          <Text style={estilos.textoInfo}>Email: saintmichel@gmail.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: darkMode ? '#121212' : '#FFF',
  },
  mapa: {
    width: '100%',
    height: 200,
  },
  viewP: {
    backgroundColor: darkMode ? '#1F2B6C' : '#BFD2F8',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  texto1: {
    fontSize: 20,
    color: darkMode ? '#BFD2F8' : '#159EEC',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  texto2: {
    fontSize: 25,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '48%',
    height: 40,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: darkMode ? '#121212' : 'white',
    borderRadius: 5,
    color: darkMode ? '#BFD2F8' : '#000',
  },
  inputA: {
    width: '100%',
    height: 40,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: darkMode ? '#121212' : 'white',
    borderRadius: 5,
    marginBottom: 10,
    color: darkMode ? '#BFD2F8' : '#000',
  },
  inputM: {
    width: '100%',
    height: 120,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: darkMode ? '#121212' : 'white',
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: darkMode ? '#BFD2F8' : '#000',
  },
  botao: {
    backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: darkMode ? '#1F2B6C' : 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoAdicional: {
    width: '100%',
    padding: 15,
    backgroundColor: darkMode ? '#121212' : '#FFF',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    borderWidth: 1,
  },
  textoInfo: {
    fontSize: 16,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    marginBottom: 5,
  },
  toggleButton: {
    backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: '33%',
    marginTop: 10
  },
  toggleButtonText: {
    color: darkMode ? '#BFD2F8' : '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});