import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ThemeContext } from '../ThemeContext';
import * as DocumentPicker from 'expo-document-picker';

const Agendamento = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [tipoPaciente, setTipoPaciente] = useState('');
  const [tipoDeExame, setTipoDeExame] = useState('');
  const [exameEspecifico, setExameEspecifico] = useState('');
  const [pedidoMedico, setPedidoMedico] = useState(null);
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const estilos = getStyles(darkMode);


  //Agendar consulta
  const especialidades = [
    'Ortopedista', 'Proctologista', 'Oncologista', 'Otorrinolaringologista',
    'Oftalmologista', 'Cardiologista', 'Pneumologista', 'Nefrologista',
    'Gastroenterologista', 'Urologista', 'Dermatologista', 'Ginecologista'
  ];

  useEffect(() => {
    const buscarMedicos = async () => {
      if (!especialidade) {
        setMedicos([]);
        return;
      }

      try {
        const response = await axios.get(`http://10.0.2.2:5000/medico/medicos?especialidade=${especialidade}`);
        setMedicos(response.data);
      } catch (err) {
        Alert.alert('Erro', 'Erro ao buscar médicos.');
      }
    };

    buscarMedicos();
  }, [especialidade]);

  const agendarConsulta = async () => {
    if (!especialidade || !medico || !data || !hora) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        especialidade,
        medico_id: Number(medico),
        data: format(data, 'yyyy-MM-dd'),
        hora: format(hora, 'HH:mm'),
      };

      await axios.post('http://10.0.2.2:5000/agendamento/agendar', payload, {
        headers: {
          Authorization: `Bearer ${token?.trim()}`,
        },
      });

      Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert('Erro', 'Erro ao agendar consulta.');
    }
  };

  //------------------------------------------------------------------------------

  //Agendar exame
  const tiposDeExame = [
    'Exame de sangue', 'Raio X', 'Ultrassom', 'Tomografia', 'Ressonância magnética'
  ];

  const agendarExame = async () => {
    if (!tipoDeExame || !exameEspecifico || !data || !hora || !pedidoMedico) { // Adicionei validação do pedidoMedico
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios, incluindo o pedido médico');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();

      // Adicione os campos básicos
      formData.append('tipoDeExame', tipoDeExame);
      formData.append('exameEspecifico', exameEspecifico);
      formData.append('data', format(data, 'yyyy-MM-dd'));
      formData.append('hora', format(hora, 'HH:mm'));

      // Adicione o arquivo PDF
      formData.append('pedidoMedico', {
        uri: pedidoMedico.uri,
        name: pedidoMedico.name || 'pedido_medico.pdf',
        type: pedidoMedico.type || 'application/pdf'
      });

      const response = await axios.post('http://10.0.2.2:5000/exame/criarexame', formData, {
        headers: {
          'Authorization': `Bearer ${token?.trim()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Sucesso', 'Exame agendado com sucesso!');
      // Limpe os campos
      setTipoDeExame('');
      setExameEspecifico('');
      setData(null);
      setHora(null);
      setPedidoMedico(null);

    } catch (err) {
      console.error('Erro detalhado:', {
        request: err.request,
        response: err.response,
        message: err.message
      });
      Alert.alert('Erro', err.response?.data?.message || 'Não foi possível agendar o exame');
    }
  };


  const selecionarPedidoMedico = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      // Verificação correta
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        setPedidoMedico({
          uri: file.uri,
          name: file.name,
          type: file.mimeType,
          size: file.size
        });
      } else {
        Alert.alert('Atenção', 'Nenhum arquivo foi selecionado');
      }
    } catch (err) {
      console.error('Erro ao selecionar arquivo:', err);
      Alert.alert('Erro', 'Falha ao selecionar o arquivo');
    }
  };

  const removerPedidoMedico = () => {
    setPedidoMedico(null);
  };


  //------------------------------------------------------------------------------

  
  return (
    <ScrollView contentContainerStyle={estilos.container}>


      <Text style={estilos.title}>Agendar Consulta/Exame</Text>

      <Text style={estilos.label}>Agendar para:</Text>
      <View style={estilos.pickerContainer}>
        <Picker
          selectedValue={tipoPaciente}
          onValueChange={(value) => setTipoPaciente(value)}
          style={estilos.picker}
          dropdownIconColor={estilos.pickerIcon.color}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Consulta" value="consulta" />
          <Picker.Item label="Exame" value="exame" />
        </Picker>
      </View>

      {tipoPaciente === 'exame' && (
        <>
          <Text style={estilos.label}>Tipo de Exame</Text>
          <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={tipoDeExame}
              onValueChange={(value) => setTipoDeExame(value)}
              style={estilos.picker}
              dropdownIconColor={estilos.pickerIcon.color}
            >
              <Picker.Item label="Selecione o tipo de exame" value="" />
              {tiposDeExame.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <Text style={estilos.label}>Exame Específico</Text>
          <TextInput
            style={estilos.input}
            placeholder="Digite o exame específico"
            placeholderTextColor={estilos.placeholderColor}
            value={exameEspecifico}
            onChangeText={setExameEspecifico}
          />

          <Text style={estilos.label}>Data</Text>
          <TouchableOpacity
            style={estilos.dateInput}
            onPress={() => setShowDateTimePicker(true)}
          >
            <Text style={estilos.dateText}>
              {data ? format(data, 'dd/MM/yyyy') : 'Selecionar data'}
            </Text>
          </TouchableOpacity>

          <Text style={estilos.label}>Horário</Text>
          <TouchableOpacity
            style={estilos.dateInput}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={estilos.dateText}>
              {hora ? format(hora, 'HH:mm') : 'Selecionar horário'}
            </Text>
          </TouchableOpacity>

          {showDateTimePicker && (
            <DateTimePicker
              value={data || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDateTimePicker(false);
                if (selectedDate) setData(selectedDate);
              }}
              themeVariant={darkMode ? 'dark' : 'light'}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={hora || new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setHora(selectedTime);
              }}
              themeVariant={darkMode ? 'dark' : 'light'}
            />
          )}

          <Text style={estilos.label}>Pedido Médico (PDF)</Text>
          {pedidoMedico ? (
            <View style={estilos.arquivoContainer}>
              <Text style={estilos.arquivoNome} numberOfLines={1} ellipsizeMode="middle">
                {pedidoMedico.name}
              </Text>
              <TouchableOpacity
                style={estilos.removerArquivoButton}
                onPress={removerPedidoMedico}
              >
                <Text style={estilos.removerArquivoText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={estilos.uploadButton}
              onPress={selecionarPedidoMedico}
            >
              <Text style={estilos.uploadButtonText}>Selecionar Arquivo PDF</Text>
            </TouchableOpacity>
          )}


          <TouchableOpacity style={estilos.button} onPress={agendarExame}>
            <Text style={estilos.buttonText}>Agendar Exame</Text>
          </TouchableOpacity>
        </>
      )}

      {tipoPaciente === 'consulta' && (
        <>
          <Text style={estilos.label}>Especialidade</Text>
          <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={especialidade}
              onValueChange={(value) => setEspecialidade(value)}
              style={estilos.picker}
              dropdownIconColor={estilos.pickerIcon.color}
            >
              <Picker.Item label="Selecione" value="" />
              {especialidades.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {especialidade !== '' && (
            <>
              <Text style={estilos.label}>Médico</Text>
              <View style={estilos.pickerContainer}>
                <Picker
                  selectedValue={medico}
                  onValueChange={(value) => setMedico(Number(value))}
                  style={estilos.picker}
                  dropdownIconColor={estilos.pickerIcon.color}
                >
                  <Picker.Item label="Selecione" value="" />
                  {medicos.map((m) => (
                    <Picker.Item key={m.id} label={m.nome_completo} value={m.id} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          <Text style={estilos.label}>Data</Text>
          <TouchableOpacity
            style={estilos.dateInput}
            onPress={() => setShowDateTimePicker(true)}
          >
            <Text style={estilos.dateText}>
              {data ? format(data, 'dd/MM/yyyy') : 'Selecionar data'}
            </Text>
          </TouchableOpacity>

          <Text style={estilos.label}>Horário</Text>
          <TouchableOpacity
            style={estilos.dateInput}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={estilos.dateText}>
              {hora ? format(hora, 'HH:mm') : 'Selecionar horário'}
            </Text>
          </TouchableOpacity>

          {showDateTimePicker && (
            <DateTimePicker
              value={data || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDateTimePicker(false);
                if (selectedDate) setData(selectedDate);
              }}
              themeVariant={darkMode ? 'dark' : 'light'}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={hora || new Date()}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setHora(selectedTime);
              }}
              themeVariant={darkMode ? 'dark' : 'light'}
            />
          )}

          <TouchableOpacity style={estilos.button} onPress={agendarConsulta}>
            <Text style={estilos.buttonText}>Agendar Consulta</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: darkMode ? '#121212' : '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  input: {
    borderWidth: 1,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    fontSize: 16,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    height: 50,
  },
  pickerIcon: {
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: darkMode ? '#1F2B6C' : '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  button: {
    backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: darkMode ? '#555' : '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: darkMode ? '#fff' : '#333',
  },
  arquivoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: darkMode ? '#444' : '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  arquivoNome: {
    color: darkMode ? '#fff' : '#333',
    flex: 1,
  },
  removerArquivoButton: {
    marginLeft: 10,
    padding: 5,
  },
  removerArquivoText: {
    color: '#ff4444',
  },
  arquivoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: darkMode ? '#555' : '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  arquivoNome: {
    flex: 1,
    color: darkMode ? '#fff' : '#000',
  },
  removerArquivoButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#ff4444',
    borderRadius: 5,
  },
  removerArquivoText: {
    color: '#fff',
  },
  placeholderColor: darkMode ? '#BFD2F8' : '#666666',
});

export default Agendamento;