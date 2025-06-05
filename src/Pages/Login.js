import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [dados, setDados] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setDados({ ...dados, [field]: value });
    // Limpa o erro quando o usuário começa a digitar
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async () => {
    // Validação dos campos
    const newErrors = {
      email: !dados.email.trim()
        ? "Por favor, preencha o campo de email."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)
          ? "Por favor, insira um email válido."
          : "",
      password: !dados.password.trim()
        ? "Por favor, preencha o campo de senha."
        : dados.password.length < 6
          ? "A senha deve ter pelo menos 6 caracteres"
          : ""
    };

    setErrors(newErrors);

    // Se houver erros, não continua
    if (newErrors.email || newErrors.password) return;

    setLoading(true);

    try {
      console.log("Enviando dados para login:", {
        email: dados.email,
        senha: dados.password
      });

      const response = await axios.post('http://10.0.2.2:5000/paciente/login', {
        email: dados.email,
        senha: dados.password // Note que o backend espera "senha"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      console.log("Resposta da API:", response.data);

      // Verifica se a resposta foi bem-sucedida (status 2xx)
      if (response.status >= 200 && response.status < 300) {
        // Aqui você pode armazenar o token ou dados do usuário
        // await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('id', response.data.id.toString());
        // Navega para a página inicial
        navigation.navigate("HomePage");
      } else {
        throw new Error(response.data.message || "Erro desconhecido no servidor");
      }
    } catch (error) {
      let errorMessage = "Erro ao fazer login";

      if (error.response) {
        // Erros específicos da API
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data?.message || "Email ou senha incorretos";
            break;
          case 401:
            errorMessage = "Email ou senha incorretos";
            break;
          case 404:
            errorMessage = "Serviço não encontrado";
            break;
          case 500:
            errorMessage = "Erro interno no servidor";
            break;
          default:
            errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || "Erro desconhecido"}`;
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = "Tempo de conexão esgotado. Verifique sua internet.";
      } else if (error.request) {
        errorMessage = "Sem resposta do servidor. Verifique sua conexão.";
      } else {
        errorMessage = "Erro ao configurar a requisição: " + error.message;
      }

      Alert.alert("Erro no Login", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <Text style={styles.hospitalName}>Saint Michel</Text>
      <Text style={styles.slogan}>Cuidar de você é nossa missão divina</Text>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[styles.input, errors.email ? styles.inputError : null]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={dados.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        placeholder="Senha"
        secureTextEntry
        value={dados.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Senha")}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  hospitalName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  slogan: {
    fontSize: 16,
    fontStyle: "italic",
    color: "white",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BFD2F8",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#159EEC",
    borderRadius: 8,
    backgroundColor: "#BFD2F8",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF6B6B",
    backgroundColor: "#FFEEEE",
  },
  button: {
    backgroundColor: "#159EEC",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    color: "white",
    marginTop: 15,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  forgotPasswordText: {
    color: "white",
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default Login;