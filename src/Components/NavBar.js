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
<<<<<<< HEAD

import { ThemeContext } from '../ThemeContext'; 
=======
import { ThemeContext } from '../ThemeContext';
>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7

export default function NavBar({ navigation }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const estilos = getStyles(darkMode);

  const navegarPara = (tela) => {
    setModalVisivel(false);
    navigation.navigate(tela);
  };

<<<<<<< HEAD
=======
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

>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7
  return (
    <View style={[estilos.viewNav, darkMode && estilos.viewNavDark]}>
      {/* Logo */}
      <Image source={require("../../assets/Logo.png")} style={estilos.logo} />

      {/* Botões à direita */}
      <View style={estilos.rightButtons}>
<<<<<<< HEAD
        {/* Botão de alternância de tema */}
        <TouchableOpacity onPress={toggleTheme} style={estilos.themeButton}>
          <Icon 
            name={darkMode ? "weather-sunny" : "weather-night"} 
            size={25} 
            color={darkMode ? "#BFD2F8" : "#FFFFFF"} 
=======
        <TouchableOpacity onPress={toggleTheme} style={estilos.themeButton}>
          <Icon 
            name={darkMode ? "weather-sunny" : "weather-night"} 
            size={24} 
            color={estilos.iconColor} 
>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image
            source={require("../../assets/tracoOpcao.png")}
<<<<<<< HEAD
            style={[estilos.opcao, darkMode && { tintColor: "#BFD2F8" }]}
=======
            style={[estilos.opcao, { tintColor: estilos.iconColor }]}
>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7
          />
        </TouchableOpacity>
      </View>

      {/* Modal do menu */}
      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
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
<<<<<<< HEAD
                  {/* Home */}
                  <TouchableOpacity
                    onPress={() => navegarPara("HomePage")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="home" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Home</Text>
                  </TouchableOpacity>

                  {/* Perfil */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Perfil")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="account" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Perfil</Text>
                  </TouchableOpacity>

                  {/* Token */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Token")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="key" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Token</Text>
                  </TouchableOpacity>

                  {/* Sobre Nós */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Sobre")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="information" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Sobre Nós</Text>
                  </TouchableOpacity>

                  {/* Serviços */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Servicos")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="tools" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Serviços</Text>
                  </TouchableOpacity>

                  {/* Especialidades */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Especialidades")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="star" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Especialidades</Text>
                  </TouchableOpacity>

                  {/* Contato */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Contato")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="email" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={[estilos.textoModal, darkMode && estilos.textoModalDark]}>Contato</Text>
=======
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
>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7
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
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  viewNav: {
<<<<<<< HEAD
    backgroundColor: "#1F2B6C",
=======
    backgroundColor: "#1F2B6C", // Mantido consistente em ambos os temas
>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  viewNavDark: {
    backgroundColor: "#121212",
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  themeButton: {
    marginRight: 15,
  },
  opcao: {
    width: 30,
    height: 30,
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
    width: 250,
<<<<<<< HEAD
    height: "80%", 
    backgroundColor: "#BFD2F8",
=======
    height: "80%",
    backgroundColor: darkMode ? "#1F2B6C" : "#BFD2F8",
>>>>>>> 993a1edccbefb01b87f819414c8de3326b5a68f7
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContainerDark: {
    backgroundColor: "#1F2B6C",
  },
  janelaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F2B6C",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  janelaTopoDark: {
    backgroundColor: "#121212",
  },
  logoJanela: {
    width: 80,
    height: 65,
    resizeMode: "contain",
  },
  filtro: {
    marginTop: 20,
  },
  botaoModal: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  textoModal: {
    fontSize: 20,
    color: "#1F2B6C",
    fontWeight: "bold",
    marginLeft: 15,
  },
  textoModalDark: {
    color: "#BFD2F8",
  },
  viewAgenda: {
    marginTop: 20,
    alignItems: "center",
  },
  botaoAgenda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2B6C",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  botaoAgendaDark: {
    backgroundColor: "#159EEC",
  },
  textoAgenda: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
});