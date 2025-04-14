import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  Image,
  Appearance
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const generoImagens = {
  Masculino: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
  Feminino: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
  Outro: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png'
};

export default function BodyAgendamento() {
  const navigation = useNavigation();
  const [formularioAtivo, setFormularioAtivo] = useState(null);
  const [tipoAgendamento, setTipoAgendamento] = useState(null);
  const [dependenteSelecionado, setDependenteSelecionado] = useState('Selecionar');
  const [consultaDate, setConsultaDate] = useState('');
  const [consultaTime, setConsultaTime] = useState('--:--');
  const [consultaValues, setConsultaValues] = useState({
    departamento: 'Especialidade',
    profissional: 'Médico',
    tipoConsulta: 'Local',
  });

  const [exameDate, setExameDate] = useState('');
  const [exameTime, setExameTime] = useState('--:--');
  const [exameValues, setExameValues] = useState({
    categoriaExame: 'Tipo de exame',
    tipoExame: 'Exame',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [availableYears, setAvailableYears] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [dependenteInfo, setDependenteInfo] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    endereco: '',
    genero: '',
    etnia: '',
    problemaSaude: '',
    parentesco: '',
    tipoSanguineo: '',
    convenio: '',
    plano: '',
    imagemGenero: '',
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    endereco: '',
    genero: '',
    etnia: '',
    parentesco: '',
    tipoSanguineo: '',
    convenio: '',
    plano: '',
  });

  const [dependenteConcluido, setDependenteConcluido] = useState(false);

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    generateAvailableYears();
  }, []);

  const generateAvailableYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 50; i >= 0; i--) {
      years.push(currentYear - i);
    }
    for (let i = 1; i <= 10; i++) {
      years.push(currentYear + i);
    }
    setAvailableYears(years);
  };

  const dependentes = ['Filho 1', 'Filho 2', 'Cônjuge'];

  const planosPorConvenio = {
    Amil: ['Amil 400', 'Amil 500', 'Amil 600'],
    Bradesco: ['Bradesco Saúde Ouro', 'Bradesco Saúde Prata', 'Bradesco Saúde Bronze'],
    Unimed: ['Unimed Nacional', 'Unimed Empresarial', 'Unimed Individual'],
    SulAmérica: ['SulAmérica Premium', 'SulAmérica Empresarial', 'SulAmérica Básico'],
    Particular: ['Particular'],
  };

  const options = {
    tipoAgendamento: ['Para mim', 'Para um dependente'],
    dependente: dependentes,
    departamento: ['Cardiologia', 'Dermatologia', 'Gastrologia', 'Ginecologia', 'Nefrologia', 'Oftalmologia', 'Oncologia', 'Ortopedia', 'Otorrino', 'Pneumo', 'Urologia'],
    profissional: {
      Cardiologia: ['Dr. João Silva', 'Dra. Maria Oliveira'],
      Dermatologia: ['Dr. Carlos Souza', 'Dra. Sofia Pereira'],
      Gastrologia: ['Dr. Pedro Almeida', 'Dra. Ana Costa'],
      Ginecologia: ['Dr. Marcos Santos', 'Dra. Juliana Ferreira'],
      Nefrologia: ['Dr. Lucas Martins', 'Dra. Patricia Gomes'],
      Oftalmologia: ['Dr. Rafael Lima', 'Dra. Camila Rocha'],
      Oncologia: ['Dr. Gabriel Barbosa', 'Dra. Fernanda Nunes'],
      Ortopedia: ['Dr. Eduardo Ribeiro', 'Dra. Amanda Carvalho'],
      Otorrino: ['Dr. Daniel Castro', 'Dra. Beatriz Dias'],
      Pneumo: ['Dr. Rodrigo Mendes', 'Dra. Larissa Pinto'],
      Urologia: ['Dr. Vinicius Moreira', 'Dra. Isabela Cardoso'],
    },
    tipoConsulta: ['Presencial', 'Online'],
    categoriaExame: [
      'Exames de Sangue',
      'Exames de Imagem',
      'Exames Cardiológicos',
      'Exames de Urina',
      'Exames Hormonais',
      'Exames Microbiológicos',
      'Outros',
    ],
    tipoExame: {
      'Exames de Sangue': [
        'Hemograma Completo',
        'Glicemia em Jejum',
        'Colesterol Total',
        'Triglicerídeos',
        'TGO e TGP',
        'TSH e T4 Livre',
      ],
      'Exames de Imagem': [
        'Raio-X',
        'Ultrassom',
        'Tomografia Computadorizada',
        'Ressonância Magnética',
        'Mamografia',
        'Densitometria Óssea',
      ],
      'Exames Cardiológicos': [
        'Eletrocardiograma',
        'Teste Ergométrico',
        'Ecocardiograma',
        'Holter 24 horas',
        'MAPA 24 horas',
      ],
      'Exames de Urina': [
        'Urina Tipo 1',
        'Urocultura',
        'Proteinúria de 24 horas',
        'Clearance de Creatinina',
      ],
      'Exames Hormonais': [
        'Cortisol',
        'Prolactina',
        'Testosterona',
        'Estradiol',
        'Progesterona',
      ],
      'Exames Microbiológicos': [
        'Cultura de Secreção',
        'Antibiograma',
        'Pesquisa de Fungos',
        'Pesquisa de Parasitas',
      ],
      Outros: [
        'Teste de Alergia',
        'Exame de Vista',
        'Audiometria',
        'Endoscopia',
        'Colonoscopia',
      ],
    },
    convenio: ['Amil', 'Unimed', 'Bradesco', 'SulAmérica', 'Particular'],
    genero: ['Masculino', 'Feminino', 'Outro'],
    etnia: ['Branco', 'Negro', 'Pardo', 'Indígena', 'Amarelo'],
    parentesco: ['Filho', 'Cônjuge', 'Outro'],
    tipoSanguineo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Desconhecido'],
  };

  const formatCPF = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (!match) return '';
    return `${match[1]}${match[2] ? '.' + match[2] : ''}${match[3] ? '.' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
  };

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return '';
    return `${match[1] ? '(' + match[1] : ''}${match[2] ? ') ' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
  };

  const validateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    
    if (birthDate > today) {
      return { isValid: false, error: 'Data de nascimento não pode ser no futuro' };
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 0) {
      return { isValid: false, error: 'Data inválida' };
    }
    
    return { isValid: true, error: '' };
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'nomeCompleto':
        if (!value.trim()) error = 'Nome completo é obrigatório';
        else if (value.length < 5) error = 'Nome muito curto';
        break;
      case 'dataNascimento':
        if (!value) error = 'Data de nascimento é obrigatória';
        else {
          const ageValidation = validateAge(value);
          if (!ageValidation.isValid) error = ageValidation.error;
        }
        break;
      case 'cpf':
        if (!value) error = 'CPF é obrigatório';
        else if (value.replace(/\D/g, '').length !== 11) error = 'CPF inválido';
        break;
      case 'endereco':
        if (!value) error = 'Endereço é obrigatório';
        else if (value.length < 10) error = 'Endereço muito curto';
        break;
      case 'genero':
        if (!value) error = 'Gênero é obrigatório';
        break;
      case 'etnia':
        if (!value) error = 'Etnia é obrigatória';
        break;
      case 'parentesco':
        if (!value) error = 'Parentesco é obrigatório';
        break;
      case 'tipoSanguineo':
        if (!value) error = 'Tipo sanguíneo é obrigatório';
        break;
      case 'convenio':
        if (!value) error = 'Convênio é obrigatório';
        break;
      case 'plano':
        if (!value && dependenteInfo.convenio !== 'Particular') error = 'Plano é obrigatório';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    for (const field in dependenteInfo) {
      if (field === 'problemaSaude' || field === 'imagemGenero') continue;

      const fieldValid = validateField(field, dependenteInfo[field]);
      if (!fieldValid) isValid = false;
    }

    return isValid;
  };

  const openModal = (form, field) => {
    setCurrentForm(form);
    setCurrentField(field);
    setModalVisible(true);
    setShowYearPicker(false);
  };

  const selectOption = (value) => {
    if (currentField === 'tipoAgendamento') {
      setTipoAgendamento(value);
      if (value === 'Para mim') {
        setDependenteSelecionado('Selecionar');
      }
    } else if (currentField === 'dependente') {
      setDependenteSelecionado(value);
    } else if (currentForm === 'consulta') {
      if (currentField === 'departamento') {
        setConsultaValues((prev) => ({ ...prev, departamento: value, profissional: 'Médico' }));
      } else {
        setConsultaValues((prev) => ({ ...prev, [currentField]: value }));
      }
    } else if (currentForm === 'exame') {
      if (currentField === 'categoriaExame') {
        setExameValues((prev) => ({ ...prev, categoriaExame: value, tipoExame: 'Exame' }));
      } else {
        setExameValues((prev) => ({ ...prev, [currentField]: value }));
      }
    } else if (currentField === 'convenio') {
      setDependenteInfo((prev) => ({ 
        ...prev, 
        convenio: value, 
        plano: value === 'Particular' ? 'Particular' : '',
        imagemGenero: generoImagens[value] || ''
      }));
      validateField('convenio', value);
      setErrors(prev => ({ ...prev, plano: '' }));
    } else if (currentField === 'plano') {
      setDependenteInfo((prev) => ({ ...prev, [currentField]: value }));
      validateField('plano', value);
    } else if (currentField === 'genero') {
      setDependenteInfo((prev) => ({ 
        ...prev, 
        [currentField]: value,
        imagemGenero: generoImagens[value] || ''
      }));
      validateField('genero', value);
    } else if (
      currentField === 'etnia' ||
      currentField === 'parentesco' ||
      currentField === 'tipoSanguineo'
    ) {
      setDependenteInfo((prev) => ({ ...prev, [currentField]: value }));
      validateField(currentField, value);
    }
    setModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setDependenteInfo((prev) => ({ ...prev, [field]: value }));
    
    if (field === 'cpf') {
      const formatted = formatCPF(value);
      setDependenteInfo(prev => ({ ...prev, cpf: formatted }));
      validateField('cpf', value.replace(/\D/g, ''));
    } else {
      validateField(field, value);
    }
  };

  const handleConcluirDependente = () => {
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente');
      return;
    }

    Alert.alert(
      'Dependente Cadastrado',
      'Dependente cadastrado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => setDependenteConcluido(true),
        },
      ]
    );
  };

  const handleAgendarConsulta = () => {
    if (!consultaValues.departamento || consultaValues.departamento === 'Especialidade') {
      Alert.alert('Erro', 'Selecione uma especialidade');
      return;
    }
    if (!consultaValues.profissional || consultaValues.profissional === 'Médico') {
      Alert.alert('Erro', 'Selecione um profissional');
      return;
    }
    if (!consultaDate || consultaDate === 'dd/mm/aaaa') {
      Alert.alert('Erro', 'Selecione uma data');
      return;
    }
    if (!consultaTime || consultaTime === '--:--') {
      Alert.alert('Erro', 'Selecione um horário');
      return;
    }
    if (!consultaValues.tipoConsulta || consultaValues.tipoConsulta === 'Local') {
      Alert.alert('Erro', 'Selecione o tipo de consulta');
      return;
    }

    Alert.alert(
      'Consulta Agendada',
      `Sua consulta com ${consultaValues.profissional} foi agendada para ${consultaDate} às ${consultaTime}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const handleAgendarExame = () => {
    if (!exameValues.categoriaExame || exameValues.categoriaExame === 'Tipo de exame') {
      Alert.alert('Erro', 'Selecione uma categoria de exame');
      return;
    }
    if (!exameValues.tipoExame || exameValues.tipoExame === 'Exame') {
      Alert.alert('Erro', 'Selecione um exame');
      return;
    }
    if (!exameDate || exameDate === 'dd/mm/aaaa') {
      Alert.alert('Erro', 'Selecione uma data');
      return;
    }
    if (!exameTime || exameTime === '--:--') {
      Alert.alert('Erro', 'Selecione um horário');
      return;
    }

    Alert.alert(
      'Exame Agendado',
      `Seu exame de ${exameValues.tipoExame} foi agendado para ${exameDate} às ${exameTime}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const onDayPress = (day) => {
    if (currentForm === 'consulta') {
      setConsultaDate(day.dateString);
    } else if (currentForm === 'exame') {
      setExameDate(day.dateString);
    } else if (currentField === 'dataNascimento') {
      const validation = validateAge(day.dateString);
      if (!validation.isValid) {
        Alert.alert('Data inválida', validation.error);
        return;
      }
      setDependenteInfo((prev) => ({ ...prev, dataNascimento: day.dateString }));
    }
    setModalVisible(false);
  };

  const renderTipoAgendamento = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Para quem é o agendamento?</Text>
      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.input, !tipoAgendamento && styles.inputPlaceholder]} 
          onPress={() => openModal(null, 'tipoAgendamento')}
        >
          <Text style={!tipoAgendamento ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
            {tipoAgendamento || 'Selecionar'}
          </Text>
        </TouchableOpacity>
        {tipoAgendamento === 'Para um dependente' && (
          <TouchableOpacity 
            style={[styles.input, dependenteSelecionado === 'Selecionar' && styles.inputPlaceholder]} 
            onPress={() => openModal(null, 'dependente')}
          >
            <Text style={dependenteSelecionado === 'Selecionar' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
              {dependenteSelecionado}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderDependenteForm = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Informações do Dependente</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={[styles.input, errors.nomeCompleto ? styles.inputError : null]}
            placeholder="Digite o nome completo"
            placeholderTextColor={darkMode ? '#BFD2F8' : '#999'}
            value={dependenteInfo.nomeCompleto}
            onChangeText={(text) => handleInputChange('nomeCompleto', text)}
            onBlur={() => validateField('nomeCompleto', dependenteInfo.nomeCompleto)}
          />
          {errors.nomeCompleto ? <Text style={styles.errorText}>{errors.nomeCompleto}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data de Nascimento *</Text>
          <TouchableOpacity
            style={[styles.dateInput, errors.dataNascimento ? styles.inputError : null]}
            onPress={() => openModal(null, 'dataNascimento')}
          >
            <Text style={dependenteInfo.dataNascimento ? styles.dateText : styles.placeholderText}>
              {dependenteInfo.dataNascimento || 'Selecione a data de nascimento'}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color={darkMode ? '#BFD2F8' : '#1F2B6C'} style={styles.calendarIcon} />
          </TouchableOpacity>
          {errors.dataNascimento ? <Text style={styles.errorText}>{errors.dataNascimento}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CPF *</Text>
          <TextInput
            style={[styles.input, errors.cpf ? styles.inputError : null]}
            placeholder="000.000.000-00"
            placeholderTextColor={darkMode ? '#BFD2F8' : '#999'}
            value={dependenteInfo.cpf}
            onChangeText={(text) => handleInputChange('cpf', text.replace(/\D/g, ''))}
            onBlur={() => validateField('cpf', dependenteInfo.cpf.replace(/\D/g, ''))}
            keyboardType="numeric"
            maxLength={14}
          />
          {errors.cpf ? <Text style={styles.errorText}>{errors.cpf}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={[styles.input, errors.endereco ? styles.inputError : null]}
            placeholder="Rua, número, bairro, cidade"
            placeholderTextColor={darkMode ? '#BFD2F8' : '#999'}
            value={dependenteInfo.endereco}
            onChangeText={(text) => handleInputChange('endereco', text)}
            onBlur={() => validateField('endereco', dependenteInfo.endereco)}
          />
          {errors.endereco ? <Text style={styles.errorText}>{errors.endereco}</Text> : null}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Gênero *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, errors.genero ? styles.inputError : null]}
              onPress={() => openModal(null, 'genero')}
            >
              <Text style={dependenteInfo.genero ? {color: darkMode ? '#BFD2F8' : '#000'} : styles.placeholderText}>
                {dependenteInfo.genero || 'Selecione o gênero'}
              </Text>
            </TouchableOpacity>
            {errors.genero ? <Text style={styles.errorText}>{errors.genero}</Text> : null}
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Etnia *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, errors.etnia ? styles.inputError : null]}
              onPress={() => openModal(null, 'etnia')}
            >
              <Text style={dependenteInfo.etnia ? {color: darkMode ? '#BFD2F8' : '#000'} : styles.placeholderText}>
                {dependenteInfo.etnia || 'Selecione a etnia'}
              </Text>
            </TouchableOpacity>
            {errors.etnia ? <Text style={styles.errorText}>{errors.etnia}</Text> : null}
          </View>
        </View>

        {dependenteInfo.genero && (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: dependenteInfo.imagemGenero }} 
              style={styles.generoImage}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Problema de Saúde (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o problema de saúde"
            placeholderTextColor={darkMode ? '#BFD2F8' : '#999'}
            value={dependenteInfo.problemaSaude}
            onChangeText={(text) => handleInputChange('problemaSaude', text)}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Parentesco *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, errors.parentesco ? styles.inputError : null]}
              onPress={() => openModal(null, 'parentesco')}
            >
              <Text style={dependenteInfo.parentesco ? {color: darkMode ? '#BFD2F8' : '#000'} : styles.placeholderText}>
                {dependenteInfo.parentesco || 'Selecione o parentesco'}
              </Text>
            </TouchableOpacity>
            {errors.parentesco ? <Text style={styles.errorText}>{errors.parentesco}</Text> : null}
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Tipo Sanguíneo *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, errors.tipoSanguineo ? styles.inputError : null]}
              onPress={() => openModal(null, 'tipoSanguineo')}
            >
              <Text style={dependenteInfo.tipoSanguineo ? {color: darkMode ? '#BFD2F8' : '#000'} : styles.placeholderText}>
                {dependenteInfo.tipoSanguineo || 'Selecione o tipo'}
              </Text>
            </TouchableOpacity>
            {errors.tipoSanguineo ? <Text style={styles.errorText}>{errors.tipoSanguineo}</Text> : null}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Convênio Médico *</Text>
          <TouchableOpacity 
            style={[styles.pickerContainer, errors.convenio ? styles.inputError : null]}
            onPress={() => openModal(null, 'convenio')}
          >
            <Text style={dependenteInfo.convenio ? {color: darkMode ? '#BFD2F8' : '#000'} : styles.placeholderText}>
              {dependenteInfo.convenio || 'Selecione o convênio'}
            </Text>
          </TouchableOpacity>
          {errors.convenio ? <Text style={styles.errorText}>{errors.convenio}</Text> : null}
        </View>

        {dependenteInfo.convenio && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Plano do Convênio *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, errors.plano ? styles.inputError : null]}
              onPress={() => openModal(null, 'plano')}
              disabled={dependenteInfo.convenio === 'Particular'}
            >
              <Text style={dependenteInfo.plano ? {color: darkMode ? '#BFD2F8' : '#000'} : styles.placeholderText}>
                {dependenteInfo.plano || (dependenteInfo.convenio === 'Particular' ? 'Particular' : 'Selecione o plano')}
              </Text>
            </TouchableOpacity>
            {errors.plano ? <Text style={styles.errorText}>{errors.plano}</Text> : null}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleConcluirDependente}>
          <Text style={styles.buttonText}>Concluir Cadastro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderMenuAgendamento = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={[styles.menuButton, formularioAtivo === 'consulta' && styles.menuButtonActive]}
        onPress={() => setFormularioAtivo('consulta')}
      >
        <Text style={styles.menuButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuButton, formularioAtivo === 'exame' && styles.menuButtonActive]}
        onPress={() => setFormularioAtivo('exame')}
      >
        <Text style={styles.menuButtonText}>Agendar Exame</Text>
      </TouchableOpacity>
    </View>
  );

  const renderConsultaForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Agendamento de Consulta</Text>
      
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Especialidade *</Text>
          <TouchableOpacity 
            style={[styles.pickerContainer, consultaValues.departamento === 'Especialidade' ? styles.inputPlaceholder : null]}
            onPress={() => openModal('consulta', 'departamento')}
          >
            <Text style={consultaValues.departamento === 'Especialidade' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
              {consultaValues.departamento}
            </Text>
          </TouchableOpacity>
        </View>

        {consultaValues.departamento !== 'Especialidade' && (
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Profissional *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, consultaValues.profissional === 'Médico' ? styles.inputPlaceholder : null]}
              onPress={() => openModal('consulta', 'profissional')}
            >
              <Text style={consultaValues.profissional === 'Médico' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
                {consultaValues.profissional}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Data *</Text>
          <TouchableOpacity 
            style={[styles.dateInput, consultaDate === '' ? styles.inputPlaceholder : null]}
            onPress={() => openModal('consulta', 'dataConsulta')}
          >
            <Text style={consultaDate ? styles.dateText : styles.placeholderText}>
              {consultaDate || 'Selecione a data'}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color={darkMode ? '#BFD2F8' : '#1F2B6C'} style={styles.calendarIcon} />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text style={styles.label}>Horário *</Text>
          <TouchableOpacity 
            style={[styles.pickerContainer, consultaTime === '--:--' ? styles.inputPlaceholder : null]}
            onPress={() => openModal('consulta', 'horario')}
          >
            <Text style={consultaTime === '--:--' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
              {consultaTime}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tipo de Consulta *</Text>
        <TouchableOpacity 
          style={[styles.pickerContainer, consultaValues.tipoConsulta === 'Local' ? styles.inputPlaceholder : null]}
          onPress={() => openModal('consulta', 'tipoConsulta')}
        >
          <Text style={consultaValues.tipoConsulta === 'Local' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
            {consultaValues.tipoConsulta}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAgendarConsulta}>
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExameForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Agendamento de Exame</Text>
      
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Categoria *</Text>
          <TouchableOpacity 
            style={[styles.pickerContainer, exameValues.categoriaExame === 'Tipo de exame' ? styles.inputPlaceholder : null]}
            onPress={() => openModal('exame', 'categoriaExame')}
          >
            <Text style={exameValues.categoriaExame === 'Tipo de exame' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
              {exameValues.categoriaExame}
            </Text>
          </TouchableOpacity>
        </View>

        {exameValues.categoriaExame !== 'Tipo de exame' && (
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Exame *</Text>
            <TouchableOpacity 
              style={[styles.pickerContainer, exameValues.tipoExame === 'Exame' ? styles.inputPlaceholder : null]}
              onPress={() => openModal('exame', 'tipoExame')}
            >
              <Text style={exameValues.tipoExame === 'Exame' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
                {exameValues.tipoExame}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Data *</Text>
          <TouchableOpacity 
            style={[styles.dateInput, exameDate === '' ? styles.inputPlaceholder : null]}
            onPress={() => openModal('exame', 'dataExame')}
          >
            <Text style={exameDate ? styles.dateText : styles.placeholderText}>
              {exameDate || 'Selecione a data'}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color={darkMode ? '#BFD2F8' : '#1F2B6C'} style={styles.calendarIcon} />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text style={styles.label}>Horário *</Text>
          <TouchableOpacity 
            style={[styles.pickerContainer, exameTime === '--:--' ? styles.inputPlaceholder : null]}
            onPress={() => openModal('exame', 'horario')}
          >
            <Text style={exameTime === '--:--' ? styles.placeholderText : {color: darkMode ? '#BFD2F8' : '#000'}}>
              {exameTime}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAgendarExame}>
        <Text style={styles.buttonText}>Agendar Exame</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHorarioModal = () => {
    const horarios = [];
    for (let hora = 8; hora <= 18; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horario = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        horarios.push(horario);
      }
    }

    return (
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={horarios}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    if (currentForm === 'consulta') {
                      setConsultaTime(item);
                    } else if (currentForm === 'exame') {
                      setExameTime(item);
                    }
                    setModalVisible(false);
                  }}
                >
                  <Text style={{color: darkMode ? '#BFD2F8' : '#000'}}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderCalendarModal = () => (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.yearSelectorContainer}>
            <TouchableOpacity 
              style={styles.yearArrow}
              onPress={() => {
                const newYear = selectedYear - 1;
                setSelectedYear(newYear);
                setCurrentMonth(`${newYear}-${(new Date(currentMonth).getMonth() + 1).toString().padStart(2, '0')}-01`);
              }}
            >
              <MaterialIcons name="chevron-left" size={24} color={darkMode ? '#BFD2F8' : '#1F2B6C'} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.yearTextContainer}
              onPress={() => {
                generateAvailableYears();
                setShowYearPicker(!showYearPicker);
              }}
            >
              <Text style={styles.yearText}>{selectedYear}</Text>
              <MaterialIcons 
                name={showYearPicker ? "arrow-drop-up" : "arrow-drop-down"} 
                size={24} 
                color={darkMode ? '#BFD2F8' : '#1F2B6C'} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.yearArrow}
              onPress={() => {
                const newYear = selectedYear + 1;
                setSelectedYear(newYear);
                setCurrentMonth(`${newYear}-${(new Date(currentMonth).getMonth() + 1).toString().padStart(2, '0')}-01`);
              }}
            >
              <MaterialIcons name="chevron-right" size={24} color={darkMode ? '#BFD2F8' : '#1F2B6C'} />
            </TouchableOpacity>
          </View>

          {showYearPicker && (
            <View style={styles.yearPickerContainer}>
              <FlatList
                data={availableYears}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.yearPickerItem,
                      item === selectedYear && styles.yearPickerItemSelected
                    ]}
                    onPress={() => {
                      setSelectedYear(item);
                      setCurrentMonth(`${item}-${(new Date(currentMonth).getMonth() + 1).toString().padStart(2, '0')}-01`);
                      setShowYearPicker(false);
                    }}
                  >
                    <Text style={item === selectedYear ? styles.yearPickerItemSelectedText : {color: darkMode ? '#BFD2F8' : '#000'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                getItemLayout={(data, index) => (
                  {length: 50, offset: 50 * index, index}
                )}
                initialScrollIndex={availableYears.indexOf(selectedYear)}
              />
            </View>
          )}

          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [currentForm === 'consulta' ? consultaDate : currentForm === 'exame' ? exameDate : dependenteInfo.dataNascimento]: {
                selected: true,
                selectedColor: darkMode ? '#159EEC' : '#1F2B6C',
              },
            }}
            current={`${selectedYear}-${(new Date(currentMonth).getMonth() + 1).toString().padStart(2, '0')}-01`}
            minDate={'1900-01-01'}
            maxDate={new Date().toISOString().split('T')[0]}
            onMonthChange={(month) => {
              setCurrentMonth(month.dateString);
              setSelectedYear(new Date(month.dateString).getFullYear());
            }}
            theme={{
              calendarBackground: darkMode ? '#1F2B6C' : '#FFFFFF',
              textSectionTitleColor: darkMode ? '#BFD2F8' : '#1F2B6C',
              selectedDayBackgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: darkMode ? '#BFD2F8' : '#1F2B6C',
              dayTextColor: darkMode ? '#BFD2F8' : '#2E2E2E',
              textDisabledColor: darkMode ? '#555' : '#D9D9D9',
              arrowColor: darkMode ? '#BFD2F8' : '#1F2B6C',
              monthTextColor: darkMode ? '#BFD2F8' : '#1F2B6C',
              indicatorColor: darkMode ? '#BFD2F8' : '#1F2B6C',
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              setShowYearPicker(false);
            }}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: darkMode ? '#121212' : 'transparent',
    },
    scrollContainer: {
      flexGrow: 1,
      width: '100%',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: darkMode ? '#BFD2F8' : '#1F2B6C',
      marginBottom: 20,
      textAlign: 'center',
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    menuButton: {
      backgroundColor: darkMode ? '#1F2B6C' : '#FFF',
      padding: 15,
      borderRadius: 8,
      width: '48%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: darkMode ? 1 : 0,
      borderColor: darkMode ? '#159EEC' : 'transparent',
    },
    menuButtonActive: {
      backgroundColor: darkMode ? '#159EEC' : '#BFD2F8',
      borderWidth: 1,
      borderColor: darkMode ? '#BFD2F8' : '#1F2B6C',
    },
    menuButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? '#1F2B6C' : '#1F2B6C',
    },
    formContainer: {
      backgroundColor: darkMode ? '#1F2B6C' : '#fff',
      padding: 20,
      borderRadius: 12,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: darkMode ? '#BFD2F8' : '#1F2B6C',
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#159EEC' : '#E0E7FF',
      paddingBottom: 8,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: darkMode ? '#BFD2F8' : '#1F2B6C',
      marginBottom: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: darkMode ? '#159EEC' : '#E0E7FF',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: darkMode ? '#121212' : '#FFFFFF',
      fontSize: 16,
      color: darkMode ? '#BFD2F8' : '#2E2E2E',
      justifyContent: 'center',
    },
    inputPlaceholder: {
      borderColor: darkMode ? '#BFD2F8' : '#BFD2F8',
    },
    inputError: {
      borderColor: '#FF6B6B',
    },
    placeholderText: {
      color: darkMode ? '#BFD2F8' : '#999',
    },
    dateInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      borderWidth: 1,
      borderColor: darkMode ? '#159EEC' : '#E0E7FF',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    },
    dateText: {
      fontSize: 16,
      color: darkMode ? '#BFD2F8' : '#2E2E2E',
    },
    calendarIcon: {
      marginLeft: 10,
    },
    pickerContainer: {
      height: 50,
      borderWidth: 1,
      borderColor: darkMode ? '#159EEC' : '#E0E7FF',
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: darkMode ? '#121212' : '#FFFFFF',
      justifyContent: 'center',
    },
    errorText: {
      color: '#FF6B6B',
      fontSize: 12,
      marginTop: 4,
    },
    button: {
      backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: darkMode ? '#159EEC' : '#1F2B6C',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    buttonText: {
      color: darkMode ? '#1F2B6C' : '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: darkMode ? '#1F2B6C' : '#FFF',
      padding: 20,
      borderRadius: 12,
      width: '90%',
      maxHeight: '80%',
    },
    modalItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#159EEC' : '#E0E7FF',
    },
    closeButton: {
      marginTop: 15,
      padding: 12,
      backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
      borderRadius: 8,
      alignItems: 'center',
    },
    closeButtonText: {
      color: darkMode ? '#1F2B6C' : '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    imagePreviewContainer: {
      marginTop: 10,
      alignItems: 'center',
    },
    generoImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginTop: 5,
      borderWidth: 2,
      borderColor: darkMode ? '#159EEC' : '#1F2B6C',
    },
    yearSelectorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#159EEC' : '#E0E7FF',
    },
    yearArrow: {
      padding: 10,
    },
    yearTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    yearText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#BFD2F8' : '#1F2B6C',
      marginRight: 5,
    },
    yearPickerContainer: {
      maxHeight: 200,
      backgroundColor: darkMode ? '#121212' : '#f8f9fa',
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: darkMode ? '#159EEC' : '#E0E7FF',
    },
    yearPickerItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#159EEC' : '#E0E7FF',
      alignItems: 'center',
    },
    yearPickerItemSelected: {
      backgroundColor: darkMode ? '#159EEC' : '#1F2B6C',
    },
    yearPickerItemSelectedText: {
      color: darkMode ? '#1F2B6C' : '#FFFFFF',
      fontWeight: 'bold',
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

  return (
    <ImageBackground
      source={require('../../assets/recepcaoHospital.jpeg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: darkMode ? 0.1 : 0.3 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.toggleButton}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Text style={styles.toggleButtonText}>
              {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>Agende agora</Text>

          {!tipoAgendamento && renderTipoAgendamento()}

          {tipoAgendamento === 'Para um dependente' && !dependenteConcluido && renderDependenteForm()}

          {tipoAgendamento && (tipoAgendamento === 'Para mim' || dependenteConcluido) && renderMenuAgendamento()}

          {formularioAtivo === 'consulta' && renderConsultaForm()}
          {formularioAtivo === 'exame' && renderExameForm()}

          {currentField === 'horario' ? (
            renderHorarioModal()
          ) : currentField === 'dataConsulta' || currentField === 'dataExame' || currentField === 'dataNascimento' ? (
            renderCalendarModal()
          ) : (
            <Modal visible={modalVisible} transparent animationType="fade">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={
                      currentField === 'profissional'
                        ? consultaValues.departamento !== 'Especialidade'
                          ? options.profissional[consultaValues.departamento]
                          : []
                        : currentField === 'tipoExame'
                        ? exameValues.categoriaExame !== 'Tipo de exame'
                          ? options.tipoExame[exameValues.categoriaExame]
                          : []
                        : currentField === 'plano'
                        ? planosPorConvenio[dependenteInfo.convenio] || []
                        : options[currentField]
                    }
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                        style={styles.modalItem} 
                        onPress={() => selectOption(item)}
                      >
                        <Text style={{color: darkMode ? '#BFD2F8' : '#000'}}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}