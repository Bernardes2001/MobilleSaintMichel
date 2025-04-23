import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { ThemeContext } from '../ThemeContext';

export default function ContainerContato() {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [assunto, setAssunto] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const estilos = getStyles(darkMode);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ nome, email, assunto, mensagem });
  };

  return (
    <ScrollView contentContainerStyle={estilos.scrollView}>
      <MapView
        style={estilos.mapa}
        initialRegion={{
          latitude: -23.4990,
          longitude: -46.4110,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={darkMode ? mapDarkStyle : []}
      >
        <Marker
          coordinate={{ latitude: -23.4990, longitude: -46.4110 }}
          title={"Av. Marechal Tito, 340"}
          description={"Localização do endereço"}
        />
      </MapView>

  

      <View style={estilos.formContainer}>
        <Text style={estilos.headerText}>ENTRE EM CONTATO</Text>
        <Text style={estilos.titleText}>Contato</Text>
        
        <View style={estilos.inputRow}>
          <TextInput
            style={estilos.input}
            placeholder="Nome"
            placeholderTextColor={estilos.placeholderColor}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={estilos.input}
            placeholder="Email"
            placeholderTextColor={estilos.placeholderColor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        
        <TextInput
          style={estilos.inputSingle}
          placeholder="Assunto"
          placeholderTextColor={estilos.placeholderColor}
          value={assunto}
          onChangeText={setAssunto}
        />
        
        <TextInput
          style={estilos.inputMessage}
          placeholder="Mensagem"
          placeholderTextColor={estilos.placeholderColor}
          value={mensagem}
          onChangeText={setMensagem}
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity 
          style={estilos.submitButton} 
          onPress={handleSubmit}
        >
          <Text style={estilos.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
        
        <View style={estilos.contactInfo}>
          <Text style={estilos.contactText}>Endereço: Av. Marechal Tito, 340</Text>
          <Text style={estilos.contactText}>Telefone: (11) 6818-1255</Text>
          <Text style={estilos.contactText}>Email: saintmichel@gmail.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const mapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  }
];

const getStyles = (darkMode) => StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    paddingBottom: 30,
  },
  mapa: {
    width: '100%',
    height: 250,
  },
  formContainer: {
    backgroundColor: darkMode ? '#1F2B6C' : '#BFD2F8',
    width: '90%',
    padding: 25,
    borderRadius: 15,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 20,
    color: '#BFD2F8', // Mais claro (azul claro) em ambos os temas
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 25,
    color: '#BFD2F8', // Mais claro (azul claro) em ambos os temas
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
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
    borderColor: '#BFD2F8', // Borda mais clara
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    borderRadius: 8,
    color: '#BFD2F8', // Texto mais claro (azul claro)
    fontSize: 16,
  },
  inputSingle: {
    width: '100%',
    height: 50,
    borderColor: '#BFD2F8', // Borda mais clara
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    color: '#BFD2F8', // Texto mais claro (azul claro)
    fontSize: 16,
  },
  inputMessage: {
    width: '100%',
    height: 150,
    borderColor: '#BFD2F8', // Borda mais clara
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: '#BFD2F8', // Texto mais claro (azul claro)
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#159EEC', // Azul médio para melhor contraste
    padding: 16,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF', // Branco para melhor legibilidade
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    width: '100%',
    padding: 20,
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    borderRadius: 8,
    borderColor: '#BFD2F8', // Borda mais clara
    borderWidth: 1,
  },
  contactText: {
    fontSize: 16,
    color: '#BFD2F8', // Texto mais claro (azul claro)
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderColor: '#BFD2F8', 
});