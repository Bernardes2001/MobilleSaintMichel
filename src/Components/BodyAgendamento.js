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

  const especialidades = [
    'Ortopedista', 'Proctologista', 'Oncologista', 'Otorrinolaringologista',
    'Oftalmologista', 'Cardiologista', 'Pneumologista', 'Nefrologista',
    'Gastroenterologista', 'Urologista', 'Dermatologista', 'Ginecologista'
  ];
  
  const tiposDeExame = [
    'Exame de sangue', 'Raio X', 'Ultrassom', 'Tomografia', 'Ressonância magnética'
  ];

  const estilos = getStyles(darkMode);

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

  const agendarExame = async () => {
    if (!tipoDeExame || !exameEspecifico || !data || !hora) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const payload = {
      tipoDeExame,
      exameEspecifico,
      data: format(data, 'yyyy-MM-dd'),
      hora: format(hora, 'HH:mm'),
    };

    console.log('Agendando exame...', payload);
    Alert.alert('Sucesso', 'Exame agendado com sucesso!');
  };

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
  placeholderColor: darkMode ? '#BFD2F8' : '#666666',
});

export default Agendamento;