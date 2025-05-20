import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Text, TextInput, View, ScrollView, Alert, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const generoImagens = {
  Masculino: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
  Feminino: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
  Outro: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png'
};

const CadastroPaciente = () => {
  const navigation = useNavigation();
  
  const [dados, setDados] = useState({
    nomeCompleto: '',
    dataDeNascimento: '',
    cpf: '',
    rg: '',
    genero: '',
    cep: '',
    endereco: '',
    telefone: '',
    convenioMedico: '',
    planoConvenio: '',
    tipoSanguineo: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    imagemGenero: '',
  });

  const [errors, setErrors] = useState({
    nomeCompleto: '',
    dataDeNascimento: '',
    cpf: '',
    rg: '',
    genero: '',
    cep: '',
    endereco: '',
    telefone: '',
    convenioMedico: '',
    planoConvenio: '',
    tipoSanguineo: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]);

  const [convenios, setConvenios] = useState([
    { id: 1, nome: 'Particular', planos: ['Particular'] },
    { id: 2, nome: 'Unimed', planos: ['Unimed Nacional', 'Unimed Empresarial', 'Unimed Individual'] },
    { id: 3, nome: 'SulAmérica', planos: ['SulAmérica Premium', 'SulAmérica Empresarial', 'SulAmérica Básico'] },
    { id: 4, nome: 'Amil', planos: ['Amil 400', 'Amil 500', 'Amil 600'] },
    { id: 5, nome: 'Bradesco Saúde', planos: ['Bradesco Saúde Ouro', 'Bradesco Saúde Prata', 'Bradesco Saúde Bronze'] },
  ]);
  const [planosDisponiveis, setPlanosDisponiveis] = useState([]);

  // Funções para busca de CEP
  const getCepData = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      setDados(prev => ({
        ...prev,
        cep: formatCEP(cep),
        endereco: `${data.logradouro || ''}, ${data.bairro || ''}, ${data.localidade || ''} - ${data.uf || ''}`.replace(/, ,/g, '').replace(/^, /, '')
      }));

      setErrors(prev => ({ ...prev, cep: '', endereco: '' }));

    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      Alert.alert('CEP inválido', 'O CEP digitado não foi encontrado ou é inválido.');
      setErrors(prev => ({ ...prev, cep: 'CEP inválido ou não encontrado' }));
    }
  };

  const handleCepChange = (text) => {
    const cep = text.replace(/\D/g, '');
    const formattedCEP = formatCEP(cep);
    
    setDados(prev => ({ ...prev, cep: formattedCEP }));
    
    if (cep.length === 8) {
      getCepData(cep);
    }
    
    if (cep.length > 0 && cep.length < 8) {
      setErrors(prev => ({ ...prev, cep: 'CEP incompleto' }));
    } else {
      setErrors(prev => ({ ...prev, cep: '' }));
    }
  };

  const formatCEP = (cep) => {
    const cleaned = cep.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
    if (!match) return '';
    return `${match[1]}${match[2] ? '-' + match[2] : ''}`;
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
    
    if (age < 18) {
      return { isValid: false, error: 'O paciente deve ter pelo menos 18 anos' };
    }
    
    return { isValid: true, error: '' };
  };

  const handleYearChange = (year) => {
    const currentDate = selectedDate ? new Date(selectedDate) : new Date();
    const newDate = new Date(currentDate.setFullYear(year));
    
    if (newDate > new Date()) {
      Alert.alert('Ano inválido', 'Não é possível selecionar anos futuros');
      return;
    }
    
    const newDateString = newDate.toISOString().split('T')[0];
    setSelectedDate(newDateString);
    setCurrentMonth(newDateString);
  };

  const handleConvenioChange = (convenioId) => {
    const convenioSelecionado = convenios.find(c => c.id === convenioId);
    
    setDados({
      ...dados,
      convenioMedico: convenioSelecionado?.nome || '',
      planoConvenio: ''
    });

    if (convenioSelecionado) {
      setPlanosDisponiveis(convenioSelecionado.planos);
    } else {
      setPlanosDisponiveis([]);
    }

    validateField('convenioMedico', convenioSelecionado?.nome || '');
    setErrors(prev => ({ ...prev, planoConvenio: '' }));
  };

  const handlePlanoChange = (plano) => {
    setDados({
      ...dados,
      planoConvenio: plano
    });
    validateField('planoConvenio', plano);
  };

  const handleChange = (field, value) => {
    if (field === 'endereco' && dados.cep && dados.cep.replace(/\D/g, '').length === 8) {
      setDados(prev => {
        const newDados = { ...prev, [field]: value, cep: '' };
        return newDados;
      });
    } else {
      setDados(prev => {
        const newDados = { ...prev, [field]: value };
        
        if (field === 'genero') {
          newDados.imagemGenero = generoImagens[value] || '';
        }
        
        return newDados;
      });
    }

    if (['senha', 'confirmarSenha'].includes(field)) {
      if (dados.senha && dados.confirmarSenha) {
        const match = dados.senha === (field === 'senha' ? value : dados.confirmarSenha);
        setPasswordMatchError(!match);
        setErrors(prev => ({
          ...prev,
          confirmarSenha: !match ? 'As senhas não coincidem' : ''
        }));
      }
    }

    if (field === 'email' && value) {
      validateField(field, value);
    }
  };

  const formatCPF = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (!match) return '';
    return `${match[1]}${match[2] ? '.' + match[2] : ''}${match[3] ? '.' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
  };
  
  const formatRG = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (!match) return '';
    return `${match[1]}${match[2] ? '.' + match[2] : ''}${match[3] ? '.' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
  };
  
  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return '';
    return `${match[1] ? '(' + match[1] : ''}${match[2] ? ') ' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'nomeCompleto':
        if (!value.trim()) error = 'Nome completo é obrigatório';
        else if (value.length < 5) error = 'Nome muito curto';
        break;
      case 'dataDeNascimento':
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
      case 'rg':
        if (!value) error = 'RG é obrigatório';
        break;
      case 'genero':
        if (!value) error = 'Gênero é obrigatório';
        break;
      case 'cep':
        if (!value) error = 'CEP é obrigatório';
        else if (value.replace(/\D/g, '').length !== 8) error = 'CEP inválido';
        break;
      case 'endereco':
        if (!value) error = 'Endereço é obrigatório';
        else if (value.length < 10) error = 'Endereço muito curto';
        break;
      case 'telefone':
        if (!value) error = 'Telefone é obrigatório';
        else if (value.replace(/\D/g, '').length < 10) error = 'Telefone inválido';
        break;
      case 'email':
        if (!value) error = 'Email é obrigatório';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
        break;
      case 'senha':
        if (!value) error = 'Senha é obrigatória';
        else if (value.length < 6) error = 'Senha deve ter no mínimo 6 caracteres';
        break;
      case 'confirmarSenha':
        if (!value) error = 'Confirmação de senha é obrigatória';
        else if (value !== dados.senha) error = 'As senhas não coincidem';
        break;
      case 'convenioMedico':
        if (!value) error = 'Convênio médico é obrigatório';
        break;
      case 'planoConvenio':
        if (!value && dados.convenioMedico !== 'Particular') error = 'Plano do convênio é obrigatório';
        break;
      case 'tipoSanguineo':
        if (!value) error = 'Tipo sanguíneo é obrigatório';
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

    for (const field in dados) {
      if (field === 'imagemGenero') continue;

      const fieldValid = validateField(field, dados[field]);
      if (!fieldValid) isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (dados.dataDeNascimento) {
      const ageValidation = validateAge(dados.dataDeNascimento);
      if (!ageValidation.isValid) {
        Alert.alert('Erro', ageValidation.error);
        return;
      }
    }
    
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente');
      return;
    }

    const dadosParaEnviar = {
      ...dados,
      imagemGenero: dados.imagemGenero || generoImagens['Outro']
    };

    console.log('Dados enviados:', dadosParaEnviar);
    try {
      const response = await axios.post('http://10.0.2.2:5000/paciente/cadastro', dadosParaEnviar);
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
      console.log('Resposta da API:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível cadastrar o paciente.');
    }
  };

  const onDayPress = (day) => {
    const validation = validateAge(day.dateString);
    
    if (!validation.isValid) {
      Alert.alert('Data inválida', validation.error);
      return;
    }
    
    setSelectedDate(day.dateString);
    handleChange('dataDeNascimento', day.dateString);
    setIsCalendarVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastro de Paciente</Text>
        <Text style={styles.subtitle}>Preencha os dados do paciente</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            placeholder="Digite o nome completo"
            value={dados.nomeCompleto}
            onChangeText={(text) => handleChange('nomeCompleto', text)}
            onBlur={() => validateField('nomeCompleto', dados.nomeCompleto)}
            style={[styles.input, errors.nomeCompleto ? styles.inputError : null]}
            placeholderTextColor="#999"
          />
          {errors.nomeCompleto ? <Text style={styles.errorText}>{errors.nomeCompleto}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data de Nascimento *</Text>
          <TouchableOpacity
            onPress={() => setIsCalendarVisible(true)}
            style={[styles.dateInput, errors.dataDeNascimento ? styles.inputError : null]}
          >
            <Text style={dados.dataDeNascimento ? styles.dateText : styles.placeholderText}>
              {dados.dataDeNascimento || 'Selecione a data de nascimento'}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color="#1F2B6C" style={styles.calendarIcon} />
          </TouchableOpacity>
          {errors.dataDeNascimento ? <Text style={styles.errorText}>{errors.dataDeNascimento}</Text> : null}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>CPF *</Text>
            <TextInput
              placeholder="000.000.000-00"
              value={formatCPF(dados.cpf)}
              onChangeText={(text) => handleChange('cpf', text.replace(/\D/g, ''))}
              onBlur={() => validateField('cpf', dados.cpf)}
              style={[styles.input, errors.cpf ? styles.inputError : null]}
              keyboardType="numeric"
              placeholderTextColor="#999"
              maxLength={14}
            />
            {errors.cpf ? <Text style={styles.errorText}>{errors.cpf}</Text> : null}
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>RG *</Text>
            <TextInput
              placeholder="00.000.000-0"
              value={formatRG(dados.rg)}
              onChangeText={(text) => handleChange('rg', text.replace(/\D/g, ''))}
              onBlur={() => validateField('rg', dados.rg)}
              style={[styles.input, errors.rg ? styles.inputError : null]}
              keyboardType="numeric"
              placeholderTextColor="#999"
              maxLength={12}
            />
            {errors.rg ? <Text style={styles.errorText}>{errors.rg}</Text> : null}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gênero *</Text>
          <View style={[styles.pickerContainer, errors.genero ? styles.inputError : null]}>
            <Picker
              selectedValue={dados.genero}
              onValueChange={(itemValue) => {
                handleChange('genero', itemValue);
                validateField('genero', itemValue);
              }}
              style={styles.picker}
              dropdownIconColor="#1F2B6C"
            >
              <Picker.Item label="Selecione o gênero" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </View>
          {errors.genero ? <Text style={styles.errorText}>{errors.genero}</Text> : null}
          
          {dados.genero && (
            <View style={styles.imagePreviewContainer}>
              <Text style={styles.label}>Imagem do Gênero:</Text>
              <Image 
                source={{ uri: dados.imagemGenero }} 
                style={styles.generoImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo Sanguíneo *</Text>
          <View style={[styles.pickerContainer, errors.tipoSanguineo ? styles.inputError : null]}>
            <Picker
              selectedValue={dados.tipoSanguineo}
              onValueChange={(itemValue) => {
                handleChange('tipoSanguineo', itemValue);
                validateField('tipoSanguineo', itemValue);
              }}
              style={styles.picker}
              dropdownIconColor="#1F2B6C"
            >
              <Picker.Item label="Selecione o tipo sanguíneo" value="" />
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((tipo) => (
                <Picker.Item key={tipo} label={tipo} value={tipo} />
              ))}
            </Picker>
          </View>
          {errors.tipoSanguineo ? <Text style={styles.errorText}>{errors.tipoSanguineo}</Text> : null}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CEP *</Text>
          <View style={[styles.cepContainer, errors.cep ? styles.inputError : null]}>
            <TextInput
              placeholder="00000-000"
              value={dados.cep}
              onChangeText={handleCepChange}
              onBlur={() => validateField('cep', dados.cep)}
              style={styles.cepInput}
              keyboardType="numeric"
              placeholderTextColor="#999"
              maxLength={9}
            />
            <TouchableOpacity
              onPress={() => {
                if (dados.cep && dados.cep.replace(/\D/g, '').length === 8) {
                  getCepData(dados.cep.replace(/\D/g, ''));
                }
              }}
              style={styles.searchIcon}
            >
              <MaterialIcons name="search" size={20} color="#1F2B6C" />
            </TouchableOpacity>
          </View>
          {errors.cep ? <Text style={styles.errorText}>{errors.cep}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            placeholder="Rua, número, bairro, cidade"
            value={dados.endereco}
            onChangeText={(text) => handleChange('endereco', text)}
            onBlur={() => validateField('endereco', dados.endereco)}
            style={[styles.input, errors.endereco ? styles.inputError : null]}
            placeholderTextColor="#999"
          />
          {errors.endereco ? <Text style={styles.errorText}>{errors.endereco}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            placeholder="(XX) XXXXX-XXXX"
            value={formatPhone(dados.telefone)}
            onChangeText={(text) => handleChange('telefone', text.replace(/\D/g, ''))}
            onBlur={() => validateField('telefone', dados.telefone)}
            style={[styles.input, errors.telefone ? styles.inputError : null]}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
            maxLength={15}
          />
          {errors.telefone ? <Text style={styles.errorText}>{errors.telefone}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            placeholder="seu@email.com"
            value={dados.email}
            onChangeText={(text) => handleChange('email', text)}
            onBlur={() => validateField('email', dados.email)}
            style={[styles.input, errors.email ? styles.inputError : null]}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Segurança</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha *</Text>
          <View style={[
            styles.passwordContainer,
            (errors.senha || passwordMatchError) ? styles.inputError : null
          ]}>
            <TextInput
              placeholder="Mínimo 6 caracteres"
              value={dados.senha}
              onChangeText={(text) => {
                handleChange('senha', text);
                if (dados.confirmarSenha) {
                  setPasswordMatchError(text !== dados.confirmarSenha);
                }
              }}
              onBlur={() => validateField('senha', dados.senha)}
              secureTextEntry={!isPasswordVisible}
              style={styles.passwordInput}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                size={20}
                color="#1F2B6C"
              />
            </TouchableOpacity>
          </View>
          {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Senha *</Text>
          <View style={[
            styles.passwordContainer,
            (errors.confirmarSenha || passwordMatchError) ? styles.inputError : null
          ]}>
            <TextInput
              placeholder="Digite novamente a senha"
              value={dados.confirmarSenha}
              onChangeText={(text) => {
                handleChange('confirmarSenha', text);
                setPasswordMatchError(dados.senha !== text);
              }}
              onBlur={() => {
                validateField('confirmarSenha', dados.confirmarSenha);
                setPasswordMatchError(dados.senha !== dados.confirmarSenha);
              }}
              secureTextEntry={!isConfirmPasswordVisible}
              style={styles.passwordInput}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'}
                size={20}
                color="#1F2B6C"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmarSenha ? (
            <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
          ) : passwordMatchError ? (
            <Text style={styles.errorText}>As senhas não coincidem</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações de Saúde</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Convênio Médico *</Text>
          <View style={[styles.pickerContainer, errors.convenioMedico ? styles.inputError : null]}>
            <Picker
              selectedValue={convenios.find(c => c.nome === dados.convenioMedico)?.id || ''}
              onValueChange={handleConvenioChange}
              style={styles.picker}
              dropdownIconColor="#1F2B6C"
            >
              <Picker.Item label="Selecione o convênio" value="" />
              {convenios.map(convenio => (
                <Picker.Item 
                  key={convenio.id} 
                  label={convenio.nome} 
                  value={convenio.id} 
                />
              ))}
            </Picker>
          </View>
          {errors.convenioMedico && <Text style={styles.errorText}>{errors.convenioMedico}</Text>}
        </View>

        {dados.convenioMedico && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {dados.convenioMedico === 'Particular' ? 'Plano' : 'Plano do Convênio *'}
            </Text>
            <View style={[styles.pickerContainer, errors.planoConvenio ? styles.inputError : null]}>
              <Picker
                selectedValue={dados.planoConvenio}
                onValueChange={handlePlanoChange}
                style={styles.picker}
                dropdownIconColor="#1F2B6C"
                enabled={dados.convenioMedico !== 'Particular'}
              >
                <Picker.Item 
                  label={
                    dados.convenioMedico === 'Particular' 
                      ? 'Particular' 
                      : 'Selecione o plano'
                  } 
                  value={dados.convenioMedico === 'Particular' ? 'Particular' : ''} 
                />
                {planosDisponiveis.map((plano, index) => (
                  <Picker.Item 
                    key={index} 
                    label={plano} 
                    value={plano} 
                  />
                ))}
              </Picker>
            </View>
            {errors.planoConvenio && <Text style={styles.errorText}>{errors.planoConvenio}</Text>}
          </View>
        )}
      </View>

      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.yearSelectorContainer}>
              <Picker
                selectedValue={selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear()}
                onValueChange={handleYearChange}
                style={styles.yearPicker}
                itemStyle={styles.yearPickerItem}
              >
                {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <Picker.Item key={year} label={year.toString()} value={year} />
                ))}
              </Picker>
            </View>
            
            <Calendar
              key={currentMonth}
              onDayPress={onDayPress}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#1F2B6C' }
              }}
              current={currentMonth}
              minDate={'1900-01-01'}
              maxDate={new Date().toISOString().split('T')[0]}
              onMonthChange={(month) => {
                setCurrentMonth(month.dateString);
              }}
              theme={{
                calendarBackground: '#FFFFFF',
                textSectionTitleColor: '#1F2B6C',
                selectedDayBackgroundColor: '#1F2B6C',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#1F2B6C',
                dayTextColor: '#2E2E2E',
                textDisabledColor: '#D9D9D9',
                arrowColor: '#1F2B6C',
                monthTextColor: '#1F2B6C',
                indicatorColor: '#1F2B6C',
              }}
            />
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCalendarVisible(false)}
            >
              <Text style={styles.closeButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Concluir cadastro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FF',
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2B6C',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6E7EAA',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2B6C',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E7FF',
    paddingBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2B6C',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#2E2E2E',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  cepInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2E2E2E',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2E2E2E',
  },
  eyeIcon: {
    padding: 15,
  },
  searchIcon: {
    padding: 15,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: '#2E2E2E',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  calendarIcon: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#2E2E2E',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#1F2B6C',
    borderRadius: 8,
    alignItems: 'center',
 
  },
});

export default CadastroPaciente;