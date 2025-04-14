import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Card } from 'react-native-paper';

const PerfilPaciente = () => {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/80');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    
    return () => subscription.remove();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const styles = getStyles(darkMode);

  return (
    <View style={styles.container}>
      {/* Botão de alternância de tema */}
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={() => setDarkMode(!darkMode)}
      >
        <Text style={styles.toggleButtonText}>
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </Text>
      </TouchableOpacity>

      <Card style={styles.card}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image size={80} source={{ uri: profileImage }} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>José Santos</Text>
            <Text style={styles.email}>jose@gmail.com</Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Idade:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>RG:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />
        </View>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>DADOS DO PACIENTE:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="dd/mm/aaaa"
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Endereço:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Gênero:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />

          <Text style={styles.label}>Tipo sanguíneo:</Text>
          <TextInput 
            style={styles.input} 
            placeholder=""
            placeholderTextColor={darkMode ? "#BFD2F8" : "#666"}
          />
        </View>
      </Card>
    </View>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#1D2B64',
    padding: 20,
  },
  card: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  email: {
    fontSize: 14,
    color: darkMode ? '#BFD2F8' : 'gray',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  infoSection: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  input: {
    backgroundColor: darkMode ? '#121212' : '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    color: darkMode ? '#BFD2F8' : '#000',
    borderWidth: darkMode ? 1 : 0,
    borderColor: darkMode ? '#159EEC' : 'transparent',
  },
  toggleButton: {
    backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: '50%',
  },
  toggleButtonText: {
    color: darkMode ? '#BFD2F8' : '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PerfilPaciente;