import React, { useState, useContext } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { ThemeContext } from '../ThemeContext';

export default function NavBar({ navigation }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const estilos = getStyles(darkMode);

  const navegarPara = (tela) => {
    setModalVisivel(false);
    navigation.navigate(tela);
  };


  // Opções do menu reutilizáveis
  const menuOptions = [
    { name: "HomePage", icon: "home", label: "Home" },
    { name: "Perfil", icon: "account", label: "Perfil" },
    { name: "Token", icon: "key", label: "Token" },
    { name: "Sobre", icon: "information", label: "Sobre Nós" },
    { name: "Servicos", icon: "tools", label: "Serviços" },
    { name: "Especialidades", icon: "star", label: "Especialidades" },
    { name: "Contato", icon: "email", label: "Contato" },
  ];

  return (
    <View style={[estilos.viewNav, darkMode && estilos.viewNavDark]}>
      {/* Logo */}
      <Image source={require("../../assets/Logo.png")} style={estilos.logo} />

      {/* Botões à direita */}
      <View style={estilos.rightButtons}>
        {/* Botão de alternância de tema */}
        <TouchableOpacity onPress={toggleTheme} style={estilos.themeButton}>
          <Icon
            name={darkMode ? "weather-sunny" : "weather-night"}
            size={25}
            color={darkMode ? "#BFD2F8" : "#FFFFFF"}

          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image
            source={require("../../assets/tracoOpcao.png")}
            style={[estilos.opcao, darkMode && { tintColor: "#BFD2F8" }]}

          />
        </TouchableOpacity>
      </View >

      {/* Modal do menu */}
      < Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)
        }
      >
        <TouchableWithoutFeedback onPress={() => setModalVisivel(false)}>
          <View style={estilos.overlay}>
            <TouchableWithoutFeedback>
              <View style={[estilos.modalContainer, darkMode && estilos.modalContainerDark]}>
                {/* Cabeçalho do modal */}
                <View style={[estilos.janelaTopo, darkMode && estilos.janelaTopoDark]}>
                  <Image
                    source={require("../../assets/Logo.png")}
                    style={estilos.logoJanela}
                  />
                  <TouchableOpacity onPress={() => setModalVisivel(false)}>
                    <Icon name="close" size={25} color={darkMode ? "#BFD2F8" : "#FFFFFF"} />
                  </TouchableOpacity>
                </View>

                {/* Opções do menu */}
                <View style={estilos.filtro}>

                  {menuOptions.map((option) => (
                    <TouchableOpacity
                      key={option.name}
                      onPress={() => navegarPara(option.name)}
                      style={estilos.botaoModal}
                    >
                      <Icon
                        name={option.icon}
                        size={25}
                        color={estilos.modalIconColor}
                      />
                      <Text style={estilos.textoModal}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}

                  {/* Botão de Toggle de Tema dentro do menu */}
                  <TouchableOpacity
                    onPress={toggleTheme}
                    style={estilos.botaoModal}
                  >
                    <Icon
                      name={darkMode ? "weather-sunny" : "weather-night"}
                      size={25}
                      color={estilos.modalIconColor}
                    />
                    <Text style={estilos.textoModal}>
                      {darkMode ? "Modo Claro" : "Modo Escuro"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Botão de Agendamentos */}
                <View style={estilos.viewAgenda}>
                  <TouchableOpacity
                    onPress={() => navegarPara("Agendamentos")}
                    style={[estilos.botaoAgenda, darkMode && estilos.botaoAgendaDark]}
                  >
                    <Icon name="calendar" size={25} color="#FFFFFF" />
                    <Text style={estilos.textoAgenda}>Agendamentos</Text>
                  </TouchableOpacity>
                </View>
              </View >
            </TouchableWithoutFeedback >
          </View >
        </TouchableWithoutFeedback >
      </Modal >
    </View >
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  viewNav: {
    backgroundColor: darkMode ? "#121212" : "#1F2B6C", // Black in dark mode
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: darkMode ? 0 : 1,
    borderBottomColor: darkMode ? "transparent" : "#159EEC",
    elevation: 5,
    shadowColor: darkMode ? "#000" : "#1F2B6C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  themeButton: {
    padding: 5,
  },
  opcao: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  iconColor: darkMode ? "#BFD2F8" : "#FFFFFF",
  modalIconColor: darkMode ? "#BFD2F8" : "#1F2B6C",
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-end",
  },
  modalContainer: {
    width: 280,
    height: "85%",
    backgroundColor: darkMode ? "#1E1E1E" : "#BFD2F8",
    padding: 20,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },
  janelaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: darkMode ? "#121212" : "#1F2B6C",
    padding: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  logoJanela: {
    width: 80,
    height: 50,
    resizeMode: "contain",
  },
  filtro: {
    marginTop: 25,
  },
  botaoModal: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textoModal: {
    fontSize: 18,
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    fontWeight: "600",
    marginLeft: 15,
  },
  viewAgenda: {
    marginTop: 25,
    alignItems: "center",
  },
  botaoAgenda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: darkMode ? "#159EEC" : "#1F2B6C",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    elevation: 3,
  },
  textoAgenda: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 12,
  },
});