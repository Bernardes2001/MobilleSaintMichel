import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const Senha = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senhaNova, setSenhaNova] = useState('');

  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleResetPassword = async () => {

    // validate inputs
    setEmailError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setEmailError("Por favor, preencha o campo de email.");
      return;
    }

    if (!senhaNova.trim()) {
      setEmailError("Por favor, preencha o campo de nova senha.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um email válido.");
      return;
    }

    //funcao para enviar o email de recuperação
    try {
      const response = await axios.patch('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/paciente/esqueci-senha', {
        email,
        senhaNova,
      });
      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        { onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      const msg = error.response?.data?.message || 'Email não encontrado';
      Alert.alert('Erro', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>
        Digite seu email cadastrado para alterar sua senha.
      </Text>

      {/* Email */}
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
        }}
      />

      {/* Nova senha */}
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Nova Senha"
        secureTextEntry={true}
        value={senhaNova}
        onChangeText={setSenhaNova}
      />

      {/* Exibir erros */}
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

      {/* Resetar senha */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      {/* Para voltar ao login */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2B6C",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BFD2F8",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#159EEC",
    borderRadius: 8,
    backgroundColor: "#BFD2F8",
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#159EEC",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  backText: {
    color: "white",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default Senha;