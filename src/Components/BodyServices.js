import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from '../ThemeContext';

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
  const [showAll, setShowAll] = React.useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const visibleServices = showAll ? allServices : allServices.slice(0, 4);
  const estilos = getStyles(darkMode);

  return (
    <View style={estilos.container}>
    

      <Text style={estilos.headerText}>CUIDADO EM QUE VOCÊ</Text>
      <Text style={estilos.headerText}>PODE ACREDITAR</Text>
      
      <View style={estilos.titleContainer}>
        <Text style={estilos.title}>Nossos</Text>
        <Text style={estilos.title}>Serviços:</Text>
      </View>

      <View style={estilos.gridContainer}>
        <View style={estilos.grid}>
          {visibleServices.map((service, index) => (
            <Card key={index} style={estilos.card}>
              <View style={estilos.cardContent}>
                <FontAwesome5 
                  name={service.icon} 
                  size={24} 
                  color={estilos.iconColor}
                  style={estilos.icon}
                />
                <Text style={estilos.serviceText}>{service.name}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={estilos.moreButton} 
        onPress={() => setShowAll(!showAll)}
      >
        <Text style={estilos.moreButtonText}>
          {showAll ? "Visualizar Menos" : "Visualizar Mais"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#FFFFFF',
    paddingBottom: 30,
  },
  headerText: {
    color: "#BFD2F8",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Arial",
    marginTop: 5,
  },
  titleContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    textAlign: "center",
    fontFamily: "Arial-BoldMT",
  },
  gridContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  grid: {
    width: '100%',
    maxWidth: 400,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: '48%',
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: darkMode ? "#1E1E2E" : "#F5F5F5",
    marginBottom: 15,
    elevation: 3,
    shadowColor: darkMode ? "#000" : "#1F2B6C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    alignItems: "center",
    padding: 10,
  },
  icon: {
    marginBottom: 8,
  },
  iconColor: darkMode ? "#BFD2F8" : "#1F2B6C",
  serviceText: {
    fontSize: 14,
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
  },
  moreButton: {
    backgroundColor: darkMode ? "#1E1E2E" : "#1F2B6C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
    width: '80%',
    maxWidth: 300,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  moreButtonText: {
    color: darkMode ? "#BFD2F8" : "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleButton: {
    backgroundColor: darkMode ? "#1F2B6C" : "#159EEC",
    padding: 12,
    borderRadius: 25,
    margin: 15,
    alignSelf: 'center',
    width: '40%',
    elevation: 3,
  },
  toggleButtonText: {
    color: darkMode ? "#BFD2F8" : "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});