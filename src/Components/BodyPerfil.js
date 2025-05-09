import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../ThemeContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const PerfilPaciente = () => {
  const { darkMode } = useContext(ThemeContext);
  const styles = getStyles(darkMode);
  
  // Estados para os dados do paciente
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  
  // Estados para a modal de dependentes
  const [modalVisible, setModalVisible] = useState(false);
  const [dependente, setDependente] = useState({
    nomeCompleto: '',
    cpf: '',
    dataNascimento: new Date(),
    parentesco: 'Filho(a)'
  });
  
  // Estados para o DatePicker
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Estados para lista de dependentes
  const [dependentes, setDependentes] = useState([]);

  // Opções de parentesco
  const parentescoOptions = [
    'Filho(a)',
    'Cônjuge',
    'Pai',
    'Mãe',
    'Irmão(ã)',
    'Avô(ó)',
    'Outro'
  ];

  // Busca os dados do paciente ao carregar o componente
  useEffect(() => {
    const buscarDadosPaciente = async () => {
      setLoading(true);
      try {
        const id = await AsyncStorage.getItem('id');
        if (id) {
          const response = await axios.get(`http://10.0.2.2:5000/paciente/${id}`);
          setDados(response.data.usuario);
          
          // Buscar dependentes
          const depResponse = await axios.get(`http://10.0.2.2:5000/paciente/${id}/dependentes`);
          setDependentes(depResponse.data.dependentes || []);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDadosPaciente();
  }, []);

  // Salva as alterações dos dados do paciente
  const handleSave = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      await axios.put(`http://10.0.2.2:5000/paciente/${id}`, dados);
      setEditMode(false);
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Erro ao atualizar dados');
    }
  };

  // Formata a data para exibição
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  };

  // Manipulador do DatePicker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // No iOS mantém aberto
    if (selectedDate) {
      setDependente({
        ...dependente,
        dataNascimento: selectedDate
      });
    }
  };

  // Adiciona um novo dependente
  const handleAddDependente = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      const dependenteToSend = {
        ...dependente,
        dataNascimento: formatDate(dependente.dataNascimento)
      };
      
      const response = await axios.post(`http://10.0.2.2:5000/paciente/${id}/dependentes`, dependenteToSend);
      
      // Atualiza a lista de dependentes
      setDependentes([...dependentes, response.data.dependente]);
      
      alert('Dependente adicionado com sucesso!');
      setModalVisible(false);
      setDependente({
        nomeCompleto: '',
        cpf: '',
        dataNascimento: new Date(),
        parentesco: 'Filho(a)'
      });
    } catch (error) {
      console.error('Erro ao adicionar dependente:', error);
      alert('Erro ao adicionar dependente');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Nenhum dado encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Modal para adicionar dependente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF' }]}>
            <Text style={[styles.modalTitle, { color: darkMode ? '#BFD2F8' : '#1F2B6C' }]}>Adicionar Dependente</Text>
            
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
              style={styles.input}
              value={dependente.nomeCompleto}
              onChangeText={(text) => setDependente({...dependente, nomeCompleto: text})}
              placeholder="Nome do dependente"
              placeholderTextColor={styles.placeholderColor}
            />

            <Text style={styles.label}>CPF:</Text>
            <TextInput
              style={styles.input}
              value={dependente.cpf}
              onChangeText={(text) => setDependente({...dependente, cpf: text})}
              placeholder="000.000.000-00"
              placeholderTextColor={styles.placeholderColor}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Data de Nascimento:</Text>
            <TouchableOpacity 
              style={styles.input} 
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: darkMode ? '#BFD2F8' : '#000000' }}>
                {formatDate(dependente.dataNascimento)}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dependente.dataNascimento}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                maximumDate={new Date()}
                locale="pt-BR"
                themeVariant={darkMode ? 'dark' : 'light'}
              />
            )}

            <Text style={styles.label}>Grau de Parentesco:</Text>
            <View style={[styles.pickerContainer, { 
              backgroundColor: darkMode ? '#121212' : '#F0F0F0',
              borderColor: darkMode ? '#159EEC' : '#E0E0E0'
            }]}>
              <Picker
                selectedValue={dependente.parentesco}
                onValueChange={(itemValue) => setDependente({...dependente, parentesco: itemValue})}
                style={[styles.picker, { color: darkMode ? '#BFD2F8' : '#000000' }]}
                dropdownIconColor={darkMode ? '#BFD2F8' : '#666666'}
              >
                {parentescoOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            </View>

            <View style={styles.modalButtons}>
              <Button 
                mode="contained" 
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: '#F44336' }]}
                labelStyle={styles.buttonText}
              >
                Cancelar
              </Button>
              
              <Button 
                mode="contained" 
                onPress={handleAddDependente}
                style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}
                labelStyle={styles.buttonText}
                disabled={!dependente.nomeCompleto || !dependente.cpf || !dependente.dataNascimento}
              >
                Salvar
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Seção de perfil */}
      <Card style={styles.card}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: dados.imagemGenero || 'https://via.placeholder.com/120' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{dados.nomeCompleto}</Text>
            <Text style={styles.email}>{dados.email}</Text>
          </View>
        </View>
        
        {/* Botões de ação */}
        <View style={styles.buttonsContainer}>
          {editMode ? (
            <Button 
              mode="contained" 
              onPress={handleSave}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Salvar
            </Button>
          ) : (
            <Button 
              mode="contained" 
              onPress={() => setEditMode(true)}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Editar Dados
            </Button>
          )}
          
          <Button 
            mode="contained" 
            onPress={() => setModalVisible(true)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Adicionar Dependente
          </Button>
        </View>
      </Card>

      {/* Seção de dados pessoais */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>DADOS PESSOAIS:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Nome completo:</Text>
          <TextInput
            style={styles.input}
            value={dados.nomeCompleto}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, nomeCompleto: text})}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            value={dados.cpf}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, cpf: text})}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput
            style={styles.input}
            value={dados.dataDeNascimento}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, dataDeNascimento: text})}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>RG:</Text>
          <TextInput
            style={styles.input}
            value={dados.rg}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, rg: text})}
            placeholderTextColor={styles.placeholderColor}
          />
        </View>
      </Card>

      {/* Seção de contato */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>CONTATO:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            value={dados.endereco}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, endereco: text})}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={dados.telefone}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, telefone: text})}
            placeholderTextColor={styles.placeholderColor}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={dados.email}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, email: text})}
            placeholderTextColor={styles.placeholderColor}
            keyboardType="email-address"
          />
        </View>
      </Card>

      {/* Seção de informações médicas */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>INFORMAÇÕES MÉDICAS:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Gênero:</Text>
          <TextInput
            style={styles.input}
            value={dados.genero}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, genero: text})}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Tipo sanguíneo:</Text>
          <TextInput
            style={styles.input}
            value={dados.tipoSanguineo}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, tipoSanguineo: text})}
            placeholderTextColor={styles.placeholderColor}
          />
        </View>
      </Card>

      {/* Seção de convênio */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>CONVÊNIO MÉDICO:</Text>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Convênio Médico:</Text>
          <TextInput
            style={styles.input}
            value={dados.convenioMedico}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, convenioMedico: text})}
            placeholderTextColor={styles.placeholderColor}
          />

          <Text style={styles.label}>Plano do Convênio:</Text>
          <TextInput
            style={styles.input}
            value={dados.planoConvenio}
            editable={editMode}
            onChangeText={(text) => setDados({...dados, planoConvenio: text})}
            placeholderTextColor={styles.placeholderColor}
          />
        </View>
      </Card>

      {/* Seção de dependentes */}
      {dependentes.length > 0 && (
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>DEPENDENTES:</Text>
          {dependentes.map((dep, index) => (
            <View key={index} style={styles.dependenteItem}>
              <Text style={styles.dependenteNome}>{dep.nomeCompleto}</Text>
              <Text style={styles.dependenteInfo}>Parentesco: {dep.parentesco}</Text>
              <Text style={styles.dependenteInfo}>CPF: {dep.cpf}</Text>
              <Text style={styles.dependenteInfo}>Nascimento: {formatDate(dep.dataNascimento)}</Text>
            </View>
          ))}
        </Card>
      )}
    </ScrollView>
  );
};



const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#F5F5F5',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkMode ? '#121212' : '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  card: {
    backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: darkMode ? '#000' : '#1F2B6C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#159EEC' : '#1F2B6C',
    paddingBottom: 5,
  },
  infoSection: {
    marginBottom: 5,
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
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    color: darkMode ? '#BFD2F8' : '#000000',
    borderWidth: 1,
    borderColor: darkMode ? '#159EEC' : '#E0E0E0',
    fontSize: 14,
  },
  dependenteItem: {
    backgroundColor: darkMode ? '#252538' : '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  dependenteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    marginBottom: 5,
  },
  dependenteInfo: {
    fontSize: 14,
    color: darkMode ? '#BFD2F8' : '#666666',
    marginBottom: 3,
  },
  // Estilos para o modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  placeholderColor: darkMode ? '#BFD2F8' : '#666666',
});

export default PerfilPaciente;