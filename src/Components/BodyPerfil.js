import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { ThemeContext } from '../ThemeContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const PerfilPaciente = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(darkMode);
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDadosPaciente = async () => {
      setLoading(true);
      try {
        const id = await AsyncStorage.getItem('id');
        if (id) {
          const response = await axios.get(`http://10.0.2.2:5000/paciente/${id}`);
          setDados(response.data.usuario); // <-- aqui pega o campo 'usuario'
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDadosPaciente();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (!dados) {
    return <Text>Nenhum dado encontrado</Text>;
  }



  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: dados.imagemGenero }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{dados.nomeCompleto}</Text>
            <Text style={styles.email}>{dados.email}</Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            value={dados.dataDeNascimento}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            value={dados.cpf}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>RG:</Text>
          <TextInput
            style={styles.input}
            value={dados.rg}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>DADOS DO PACIENTE:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput
            style={styles.input}
            value={dados.nomeCompleto}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            value={dados.endereco}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={dados.telefone}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={dados.email}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Gênero:</Text>
          <TextInput
            style={styles.input}
            value={dados.genero}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Tipo sanguíneo:</Text>
          <TextInput
            style={styles.input}
            value={dados.tipoSanguineo}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Convênio Médico:</Text>
          <TextInput
            style={styles.input}
            value={dados.convenioMedico}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Plano do Convênio:</Text>
          <TextInput
            style={styles.input}
            value={dados.planoConvenio}
            editable={false}
            placeholderTextColor={styles.placeholderColor}
          />
        </View>
      </Card>
    </View>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#F5F5F5',
    padding: 20,
  },
  card: {
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
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
    color: darkMode ? '#BFD2F8' : '#666666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
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
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    color: darkMode ? '#BFD2F8' : '#000000',
    borderWidth: 1,
    borderColor: darkMode ? '#159EEC' : '#E0E0E0',
    fontSize: 15,
  },
  toggleButton: {
    backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center',
    width: '50%',
  },
  toggleButtonText: {
    color: darkMode ? '#BFD2F8' : '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  placeholderColor: darkMode ? '#BFD2F8' : '#666666',
});

export default PerfilPaciente;