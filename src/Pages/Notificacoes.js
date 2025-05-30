import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../ThemeContext';

const Notificacoes = ({ navigation }) => {
  const { darkMode } = useContext(ThemeContext);
  const styles = getStyles(darkMode);
  
  const [notificacoes, setNotificacoes] = useState([
    {
      id: '1',
      titulo: 'Consulta Confirmada',
      mensagem: 'Sua consulta com Dr. Silva foi confirmada para 15/05 às 14:30',
      data: '10 min atrás',
      lida: false,
      tipo: 'consulta'
    },
    {
      id: '2',
      titulo: 'Lembrete de Pagamento',
      mensagem: 'O pagamento do seu último atendimento está pendente',
      data: '1 hora atrás',
      lida: false,
      tipo: 'financeiro'
    },
    {
      id: '3',
      titulo: 'Resultados Disponíveis',
      mensagem: 'Seus exames de sangue já estão disponíveis no portal',
      data: 'Ontem',
      lida: true,
      tipo: 'exames'
    },
    {
      id: '4',
      titulo: 'Novo Horário Disponível',
      mensagem: 'Dr. Oliveira liberou novos horários para consulta',
      data: '2 dias atrás',
      lida: true,
      tipo: 'horarios'
    },
  ]);

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map(not => 
      not.id === id ? {...not, lida: true} : not
    ));
  };

  // Marcar todas como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(not => ({...not, lida: true})));
  };

  // Obter ícone baseado no tipo de notificação
  const getIconByType = (tipo) => {
    switch(tipo) {
      case 'consulta':
        return 'calendar-check';
      case 'financeiro':
        return 'currency-usd';
      case 'exames':
        return 'file-document';
      case 'horarios':
        return 'clock-plus';
      default:
        return 'bell';
    }
  };

  // Renderizar cada item da lista
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificacaoItem, item.lida ? styles.lida : styles.naoLida]}
      onPress={() => marcarComoLida(item.id)}
    >
      <View style={styles.iconContainer}>
        <Icon 
          name={getIconByType(item.tipo)} 
          size={24} 
          color={darkMode ? '#BFD2F8' : '#1F2B6C'} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.mensagem}>{item.mensagem}</Text>
        <Text style={styles.data}>{item.data}</Text>
      </View>
      {!item.lida && <View style={styles.pontoNaoLido} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon 
            name="arrow-left" 
            size={24} 
            color={darkMode ? '#BFD2F8' : '#1F2B6C'} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <TouchableOpacity onPress={marcarTodasComoLidas}>
          <Text style={styles.marcarTodas}>Marcar todas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notificações */}
      {notificacoes.length > 0 ? (
        <FlatList
          data={notificacoes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lista}
        />
      ) : (
        <View style={styles.vazioContainer}>
          <Image 
            source={require('../../assets/face.png')} 
            style={styles.vazioImagem} 
          />
          <Text style={styles.vazioTexto}>Nenhuma notificação</Text>
        </View>
      )}
    </View>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#1E1E2E' : '#FFFFFF',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#3E3E4D' : '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
  },
  marcarTodas: {
    color: darkMode ? '#159EEC' : '#1F2B6C',
    fontSize: 14,
  },
  lista: {
    paddingHorizontal: 15,
  },
  notificacaoItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: darkMode ? '#2E2E3E' : '#F8F8F8',
    position: 'relative',
  },
  naoLida: {
    borderLeftWidth: 3,
    borderLeftColor: '#159EEC',
  },
  lida: {
    opacity: 0.8,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    marginBottom: 5,
  },
  mensagem: {
    fontSize: 14,
    color: darkMode ? '#BFD2F8' : '#1F2B6C',
    marginBottom: 5,
  },
  data: {
    fontSize: 12,
    color: darkMode ? '#8E8E9E' : '#888888',
  },
  pontoNaoLido: {
    position: 'absolute',
    right: 15,
    top: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
    marginTop: -4,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  vazioImagem: {
    width: 150,
    height: 150,
    marginBottom: 20,
    tintColor: darkMode ? '#3E3E4D' : '#E0E0E0',
  },
  vazioTexto: {
    fontSize: 16,
    color: darkMode ? '#8E8E9E' : '#888888',
    textAlign: 'center',
  },
});

export default Notificacoes;