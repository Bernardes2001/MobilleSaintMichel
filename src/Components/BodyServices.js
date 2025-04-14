import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Appearance } from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

const allServices = [
  { name: "Checkup", icon: "notes-medical" },
  { name: "Cardiograma", icon: "heartbeat" },
  { name: "Teste de DNA", icon: "dna" },
  { name: "Banco de Sangue", icon: "tint" },
  { name: "Ultrassom", icon: "stethoscope" },
  { name: "Vacinação", icon: "syringe" },
  { name: "Oftalmologia", icon: "eye" },
  { name: "Fisioterapia", icon: "walking" },
  { name: "Tratamento Contínuo", icon: "user-md" },
  { name: "Pequenas Cirurgias", icon: "briefcase-medical" },
  { name: "Atendimento Domiciliar", icon: "house-user" },
  { name: "Emergência", icon: "ambulance" }
];

export default function BodyServices() {
  const [showAll, setShowAll] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    
    return () => subscription.remove();
  }, []);

  const visibleServices = showAll ? allServices : allServices.slice(0, 4);
  const estilos = getStyles(darkMode);

  return (
    <View style={estilos.container}>
      {/* Botão de alternância igual ao primeiro código */}
      <TouchableOpacity 
        style={estilos.toggleButton}
        onPress={() => setDarkMode(!darkMode)}
      >
        <Text style={estilos.toggleButtonText}>
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </Text>
      </TouchableOpacity>

      <Text style={estilos.cuidado}>CUIDADO EM QUE VOCÊ</Text>
      <Text style={estilos.pode}>PODE ACREDITAR</Text>
      <Text style={estilos.nossos}>Nossos</Text>
      <Text style={estilos.servicos}>Serviços:</Text>

      <View style={estilos.gridContainer}>
        <View style={estilos.grid}>
          {visibleServices.map((service, index) => (
            <Card key={index} style={estilos.card}>
              <View style={estilos.cardContent}>
                <FontAwesome5 
                  name={service.icon} 
                  size={24} 
                  color={darkMode ? "#BFD2F8" : "#1F2B6C"} 
                />
                <Text style={estilos.text}>{service.name}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <TouchableOpacity style={estilos.botao} onPress={() => setShowAll(!showAll)}>
        <Text style={estilos.botaoTexto}>
          {showAll ? "Visualizar Menos" : "Visualizar Mais"}
        </Text>
      </TouchableOpacity>

      <View style={estilos.viewVazia}></View>
    </View>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    backgroundColor: darkMode ? '#121212' : '#FFF',
    minHeight: '100%',
    paddingBottom: 20,
  },
  cuidado: {
    color: "#159EEC",
    textAlign: "center",
    marginTop: 14,
    fontSize: 18,
    fontFamily: "Arial", 
  },
  pode: {
    color: "#159EEC",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Arial",
  },
  nossos: {
    fontSize: 28,
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    textAlign: "center",
    marginTop: 8,
    fontFamily: "Arial-BoldMT", 
  },
  servicos: {
    fontSize: 28,
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    textAlign: "center",
    marginTop: -12,
    fontFamily: "Arial-BoldMT",
  },
  gridContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  grid: {
    width: 270,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: darkMode ? "#1F2B6C" : "#f9f9f9",
    marginBottom: 10,
    elevation: 3,
    borderColor: darkMode ? "#159EEC" : "#d3d3d3",
    borderWidth: 1,
  },
  cardContent: {
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    fontWeight: "bold",
    textAlign: "center",
  },
  botao: {
    backgroundColor: darkMode ? "#159EEC" : "#1F2B6C",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    alignSelf: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botaoTexto: {
    color: darkMode ? "#1F2B6C" : "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewVazia: {
    backgroundColor: darkMode ? '#121212' : "#FFF",
    height: 50,
  },
  toggleButton: {
    backgroundColor: darkMode ? "#1F2B6C" : "#159EEC",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: '35%',
    marginTop: 15
  },
  toggleButtonText: {
    color: darkMode ? "#BFD2F8" : "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
  },
});