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
  const [tipoServico, setTipoServico] = useState('');
  const [tipoPaciente, setTipoPaciente] = useState(''); // 'user' ou 'dependente'
  const [dependentes, setDependentes] = useState([]);
  const [dependenteSelecionado, setDependenteSelecionado] = useState('');
  const [categoriaExame, setCategoriaExame] = useState('');
  const [tipoDeExame, setTipoDeExame] = useState('');
  const [exameEspecifico, setExameEspecifico] = useState('');
  const [examesEspecificos, setExamesEspecificos] = useState([]);
  const [pedidoMedico, setPedidoMedico] = useState(null);
  const [especialidade, setEspecialidade] = useState('');
  const [medico, setMedico] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [servicoExtra, setServicoExtra] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');

  const estilos = getStyles(darkMode);

  // Especialidades médicas
  const especialidades = [
    'Ortopedista', 'Proctologista', 'Oncologista', 'Otorrinolaringologista',
    'Oftalmologista', 'Cardiologista', 'Pneumologista', 'Nefrologista',
    'Gastroenterologista', 'Urologista', 'Dermatologista', 'Ginecologista', 'Nutricionista'
  ];

  // Serviços extras disponíveis
  const servicosExtras = [
    'Atendimento Domiciliar',
    'Pequena Cirurgia',
    'Fisioterapia'
  ];

  // Categorias principais de exames
  const categoriasPrincipaisExames = [
    'Exames Laboratoriais',
    'Exames de Imagem',
    'Exames Nutricionais'
  ];

  // Subcategorias de exames
  const subcategoriasExames = {
    'Exames Laboratoriais': [
      'Hemograma completo',
      'Glicemia em jejum',
      'Colesterol total e frações',
      'Triglicerídeos',
      'TSH e T4 livre',
      'Exame de urina',
      'Exame de fezes'
    ],
    'Exames de Imagem': [
      'Raio X',
      'Ultrassom',
      'Tomografia',
      'Ressonância magnética',
      'Mamografia',
      'Densitometria óssea'
    ],
    'Exames Nutricionais': [
      'Avaliação de composição corporal',
      'Bioimpedância',
      'Calorimetria indireta',
      'Avaliação nutricional completa',
      'Exame de vitaminas e minerais'
    ]
  };

  // Exames específicos por subcategoria
  const examesPorSubcategoria = {
    'Raio X': [
      'Raio X de tórax',
      'Raio X de coluna',
      'Raio X de membros',
      'Raio X de crânio',
      'Raio X de abdômen'
    ],
    'Ultrassom': [
      'Ultrassom abdominal',
      'Ultrassom pélvico',
      'Ultrassom de tireoide',
      'Ultrassom de mama',
      'Ultrassom Doppler vascular'
    ],
    'Tomografia': [
      'Tomografia de crânio',
      'Tomografia de tórax',
      'Tomografia de abdômen',
      'Tomografia de coluna',
      'Angiotomografia'
    ],
    'Ressonância magnética': [
      'Ressonância de crânio',
      'Ressonância de coluna',
      'Ressonância de articulações',
      'Ressonância de abdômen',
      'Ressonância cardíaca'
    ]
  };

  useEffect(() => {
    const buscarDependentes = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('id');
        const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/dependente/dependenteAdicionado/${id}`, {
          headers: {
            Authorization: `Bearer ${token?.trim()}`,
          },
        });
        setDependentes(response.data);
      } catch (err) {
        console.error('Erro ao buscar dependentes:', err);
      }
    };

    buscarDependentes();
  }, []);


  useEffect(() => {
    const buscarMedicos = async () => {
      if (!especialidade) {
        setMedicos([]);
        return;
      }

      try {
        const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/medico/medicos?especialidade=${especialidade}`);
        setMedicos(response.data);
      } catch (err) {
        Alert.alert('Erro', 'Erro ao buscar médicos.');
      }
    };

    buscarMedicos();
  }, [especialidade]);

  // Atualiza subcategorias quando a categoria principal muda
  useEffect(() => {
    if (categoriaExame && subcategoriasExames[categoriaExame]) {
      setExamesEspecificos(subcategoriasExames[categoriaExame]);
      setTipoDeExame(''); // Resetar subcategoria quando muda a categoria principal
      setExameEspecifico(''); // Resetar exame específico
    } else {
      setExamesEspecificos([]);
    }
  }, [categoriaExame]);

  // Atualiza exames específicos quando a subcategoria muda
  useEffect(() => {
    if (tipoDeExame && examesPorSubcategoria[tipoDeExame]) {
      setExamesEspecificos(examesPorSubcategoria[tipoDeExame]);
      setExameEspecifico(''); // Resetar exame específico quando muda a subcategoria
    } else if (tipoDeExame && subcategoriasExames[categoriaExame]?.includes(tipoDeExame)) {
      // Se for um exame direto (sem subdivisão)
      setExameEspecifico(tipoDeExame);
      setExamesEspecificos([]);
    }
  }, [tipoDeExame]);

  // Função para agendar consulta para o usuário
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
        hora: format(hora, 'HH:mm')
      };

      await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/agendamento/agendar', payload, {
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

  // Função para agendar consulta para dependente
  const agendarConsultaDependente = async () => {
    if (!especialidade || !medico || !data || !hora || !dependenteSelecionado) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');

      const payload = {
        usuario_id: id,
        especialidade,
        medico_id: Number(medico),
        dependente_id: Number(dependenteSelecionado),
        data: format(data, 'yyyy-MM-dd'),
        hora: format(hora, 'HH:mm'),
      };

      await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/agendarDependente', payload, {
        headers: {
          Authorization: `Bearer ${token?.trim()}`,
        },
      });

      Alert.alert('Sucesso', 'Consulta agendada para dependente com sucesso!');
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert('Erro', 'Erro ao agendar consulta.');
    }
  };

  const agendarExame = async () => {
    let exameFinal = exameEspecifico || tipoDeExame;

    if (!categoriaExame || !exameFinal || !data || !hora || !pedidoMedico) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios, incluindo o pedido médico');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();

      formData.append('categoriaExame', categoriaExame);
      formData.append('tipoDeExame', tipoDeExame);
      formData.append('exameEspecifico', exameFinal);
      formData.append('data', format(data, 'yyyy-MM-dd'));
      formData.append('hora', format(hora, 'HH:mm'));
      formData.append('paciente_id', tipoPaciente);

      formData.append('pedidoMedico', {
        uri: pedidoMedico.uri,
        name: pedidoMedico.name || 'pedido_medico.pdf',
        type: pedidoMedico.type || 'application/pdf'
      });

      const response = await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/exame/criarexame', formData, {
        headers: {
          'Authorization': `Bearer ${token?.trim()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Sucesso', 'Exame agendado com sucesso!');
      setCategoriaExame('');
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

  const handleEnviarServicoExtra = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const formData = {
        tipoServico: 'servicoExtra',
        tipoPaciente: 'user',
        servicoExtra,
        data: data.toISOString().split('T')[0], // formato: yyyy-mm-dd
        hora: hora.toTimeString().split(' ')[0], // formato: HH:mm:ss
        ...(servicoExtra === 'Atendimento Domiciliar' && {
          endereco,
          descricao,
        }),
        ...(servicoExtra === 'Pequena Cirurgia' && {
          tipoCirurgia: 'Pequena Cirurgia', // opcional: pode ser mais específico
          descricao,
        }),
        ...(servicoExtra === 'Fisioterapia' && {
          tipoFisioterapia: 'Fisioterapia', // idem
          descricao,
        }),
      };

      const response = await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/servicos-extras', formData, {
        headers: {
          'Authorization': `Bearer ${token?.trim()}`,
        },
      });

      console.log('Resposta da API:', response.data);
      alert('Serviço extra enviado com sucesso!');

      // Limpar estados:
      setServicoExtra('');
      setDescricao('');
      setEndereco('');
      setData(null);
      setHora(null);

    } catch (error) {
      console.error('Erro ao enviar serviço extra:', error);
      alert('Erro ao enviar serviço extra');
    }
  };



  const selecionarPedidoMedico = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

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

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.title}>Agendar Serviços Médicos</Text>

      <Text style={estilos.label}>Tipo de Serviço:</Text>
      <View style={estilos.pickerContainer}>
        <Picker
          selectedValue={tipoServico}
          onValueChange={(value) => {
            setTipoServico(value);
            setServicoExtra('');
          }}
          style={estilos.picker}
          dropdownIconColor={estilos.pickerIcon.color}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Consulta" value="consulta" />
          <Picker.Item label="Exame" value="exame" />
          <Picker.Item label="Serviço Extra" value="servicoExtra" />
        </Picker>
      </View>

      {tipoServico && (
        <>
          <Text style={estilos.label}>Para quem é o serviço?</Text>
          <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={tipoPaciente}
              onValueChange={(value) => setTipoPaciente(value)}
              style={estilos.picker}
              dropdownIconColor={estilos.pickerIcon.color}
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Para mim" value="user" />
              <Picker.Item label="Para dependente" value="dependente" />
            </Picker>
          </View>
        </>
      )}

      {tipoServico === 'exame' && tipoPaciente === 'user' && (
        <>
          <Text style={estilos.label}>Categoria do Exame</Text>
          <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={categoriaExame}
              onValueChange={(value) => setCategoriaExame(value)}
              style={estilos.picker}
              dropdownIconColor={estilos.pickerIcon.color}
            >
              <Picker.Item label="Selecione a categoria" value="" />
              {categoriasPrincipaisExames.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {categoriaExame === 'Exames de Imagem' && (
            <>
              <Text style={estilos.label}>Tipo de Exame de Imagem</Text>
              <View style={estilos.pickerContainer}>
                <Picker
                  selectedValue={tipoDeExame}
                  onValueChange={(value) => setTipoDeExame(value)}
                  style={estilos.picker}
                  dropdownIconColor={estilos.pickerIcon.color}
                >
                  <Picker.Item label="Selecione o tipo" value="" />
                  {subcategoriasExames['Exames de Imagem'].map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              </View>

            </>
          )}

          {(categoriaExame === 'Exames Laboratoriais' || categoriaExame === 'Exames Nutricionais') && (
            <>
              <Text style={estilos.label}>Exame Específico</Text>
              <View style={estilos.pickerContainer}>
                <Picker
                  selectedValue={exameEspecifico}
                  onValueChange={(value) => setExameEspecifico(value)}
                  style={estilos.picker}
                  dropdownIconColor={estilos.pickerIcon.color}
                >
                  <Picker.Item label="Selecione o exame" value="" />
                  {subcategoriasExames[categoriaExame].map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
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

          <Text style={estilos.label}>Pedido Médico (PDF)*</Text>
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

      {tipoServico === 'consulta' && tipoPaciente && (tipoPaciente === 'user') && (
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

      {/* consulta dependente */}
      {tipoServico === 'consulta' && tipoPaciente && (tipoPaciente === 'dependente') && (
        <>

          <Text style={estilos.label}>Dependente</Text>
          <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={dependenteSelecionado}
              onValueChange={(value) => setDependenteSelecionado(value)}
              style={estilos.picker}
              dropdownIconColor={estilos.pickerIcon.color}
            >
              <Picker.Item label="Selecione" value="" />
              {dependentes.map((dep) => (
                <Picker.Item key={dep.id} label={dep.nomeCompleto} value={dep.id} />
              ))}
            </Picker>
          </View>



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

          <TouchableOpacity style={estilos.button} onPress={agendarConsultaDependente}>
            <Text style={estilos.buttonText}>Agendar Consulta</Text>
          </TouchableOpacity>
        </>
      )}

      {tipoServico === 'servicoExtra' && tipoPaciente === 'user' && (
        <>
          <Text style={estilos.label}>Serviço Extra</Text>
          <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={servicoExtra}
              onValueChange={(value) => setServicoExtra(value)}
              style={estilos.picker}
              dropdownIconColor={estilos.pickerIcon.color}
            >
              <Picker.Item label="Selecione o serviço" value="" />
              {servicosExtras.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>

          {servicoExtra === 'Atendimento Domiciliar' && (
            <>
              <Text style={estilos.label}>Endereço Completo</Text>
              <TextInput
                style={estilos.input}
                placeholder="Digite o endereço para atendimento"
                placeholderTextColor={estilos.placeholderColor}
                value={endereco}
                onChangeText={setEndereco}
              />

              <Text style={estilos.label}>Detalhes do Serviço</Text>
              <TextInput
                style={[estilos.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Descreva o  ou sintomas"
                placeholderTextColor={estilos.placeholderColor}
                value={descricao}
                onChangeText={setDescricao}
                multiline
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
            </>
          )}

          {servicoExtra === 'Pequena Cirurgia' && (
            <>
              <Text style={estilos.label}>Detalhes do serviço</Text>
              <TextInput
                style={[estilos.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Descreva a necessidade da cirurgia"
                placeholderTextColor={estilos.placeholderColor}
                value={descricao}
                onChangeText={setDescricao}
                multiline
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
            </>
          )}

          {servicoExtra === 'Fisioterapia' && (
            <>
              <Text style={estilos.label}>Detalhes do serviço</Text>
              <TextInput
                style={[estilos.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Descreva a necessidade da cirurgia"
                placeholderTextColor={estilos.placeholderColor}
                value={descricao}
                onChangeText={setDescricao}
                multiline
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
            </>
          )}

          {servicoExtra !== '' && (
            <>
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

              <TouchableOpacity style={estilos.button} onPress={handleEnviarServicoExtra}>
                <Text style={estilos.buttonText}>
                  {servicoExtra === 'Emergência' ? 'Solicitar Emergência' : `Agendar ${servicoExtra}`}
                </Text>
              </TouchableOpacity>
            </>
          )}
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