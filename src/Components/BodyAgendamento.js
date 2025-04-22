import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';

const Agendamento = () => {
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

  // Dados da outra pessoa
  const [nomeOutro, setNomeOutro] = useState('');
  const [cpfOutro, setCpfOutro] = useState('');

  const especialidades = [
    'Ortopedista', 'Proctologista', 'Oncologista', 'Otorrinolaringologista',
    'Oftalmologista', 'Cardiologista', 'Pneumologista', 'Nefrologista',
    'Gastroenterologista', 'Urologista', 'Dermatologista', 'Ginecologista'
  ];
  const tiposDeExame = [
    'Exame de sangue', 'Raio X', 'Ultrassom', 'Tomografia', 'Ressonância magnética'
  ];

  // Função para anexar o pedido médico (PDF)
  const selecionarPedidoMedico = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setPedidoMedico(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Seleção de documento cancelada');
      } else {
        console.error('Erro ao selecionar documento', err);
        Alert.alert('Erro', 'Não foi possível anexar o pedido médico.');
      }
    }
  };
  const agendarExame = async () => {
    if (!tipoDeExame || !exameEspecifico || !data || !hora || !pedidoMedico) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Aqui você pode fazer a lógica para enviar o agendamento para o servidor
    // Exemplo de payload:
    const payload = {
      tipoDeExame,
      exameEspecifico,
      data: format(data, 'yyyy-MM-dd'),
      hora: format(hora, 'HH:mm'),
      pedidoMedico: pedidoMedico.uri, // A URI do PDF
    };

    console.log('Agendando exame...', payload);
    Alert.alert('Sucesso', 'Exame agendado com sucesso!');
  };

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

    if (tipoPaciente === 'outro' && (!nomeOutro || !cpfOutro)) {
      Alert.alert('Erro', 'Preencha os dados da outra pessoa');
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

      if (tipoPaciente === 'outro') {
        payload.nome_paciente = nomeOutro;
        payload.cpf_paciente = cpfOutro;
      }

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>

      <Text>Agendar para:</Text>
      <Picker
        selectedValue={tipoPaciente}
        onValueChange={(value) => setTipoPaciente(value)}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Consulta" value="consulta" />
        <Picker.Item label="Exame" value="exame" />
      </Picker>

      {/* Mostrar apenas os campos "Nome da pessoa" e "CPF" quando tipoPaciente for "exame" */}
      {tipoPaciente === 'exame' && (
        <>
          <Text>Tipo de Exame</Text>
          <Picker
            selectedValue={tipoDeExame}
            onValueChange={(value) => setTipoDeExame(value)}
          >
            <Picker.Item label="Selecione o tipo de exame" value="" />
            {tiposDeExame.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>

          <Text>Exame Específico</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o exame específico"
            value={exameEspecifico}
            onChangeText={setExameEspecifico}
          />

          <Text>Data</Text>
          <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
            <Text style={styles.input}>
              {data ? format(data, 'dd/MM/yyyy') : 'Selecionar data'}
            </Text>
          </TouchableOpacity>

          <Text>Horário</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.input}>
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
            />
          )}

          <TouchableOpacity style={styles.button} onPress={agendarExame}>
            <Text style={styles.buttonText}>Agendar Exame</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Mostrar os campos de especialidade e médico apenas quando tipoPaciente for "consulta" */}
      {tipoPaciente === 'consulta' && (
        <>
          <Text>Especialidade</Text>
          <Picker
            selectedValue={especialidade}
            onValueChange={(value) => setEspecialidade(value)}
          >
            <Picker.Item label="Selecione" value="" />
            {especialidades.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>

          {especialidade !== '' && (
            <>
              <Text>Médico</Text>
              <Picker
                selectedValue={medico}
                onValueChange={(value) => setMedico(Number(value))}
              >
                <Picker.Item label="Selecione" value="" />
                {medicos.map((m) => (
                  <Picker.Item key={m.id} label={m.nome_completo} value={m.id} />
                ))}
              </Picker>
            </>
          )}

          <Text>Data</Text>
          <TouchableOpacity onPress={() => setShowDateTimePicker(true)}>
            <Text style={styles.input}>
              {data ? format(data, 'dd/MM/yyyy') : 'Selecionar data'}
            </Text>
          </TouchableOpacity>

          <Text>Horário</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.input}>
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
            />
          )}
          <TouchableOpacity style={styles.button} onPress={agendarConsulta}>
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
        </>
      )}


    </View>
  );


};

export default Agendamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F9', // cor de fundo mais neutra
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333', // cor mais suave para o título
    textAlign: 'center', // centraliza o título
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', // cor de borda suave
    padding: 12,
    marginVertical: 8,
    borderRadius: 10, // bordas mais arredondadas
    backgroundColor: '#fff', // fundo branco para os inputs
    fontSize: 16,
    color: '#333', // cor de texto mais suave
  },
  button: {
    backgroundColor: '#1F2B6C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // sombra suave para o botão
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  dateText: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
