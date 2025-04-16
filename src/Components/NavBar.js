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
import { ThemeContext } from './ThemeContext';

export default function NavBar({ navigation }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navegarPara = (tela) => {
    setModalVisivel(false);
    navigation.navigate(tela);
  };

  const estilos = getStyles(darkMode);

  return (
    <View style={estilos.viewNav}>
      {/* Logo */}
      <Image source={require("../../assets/Logo.png")} style={estilos.logo} />

      {/* Botões à direita */}
      <View style={estilos.rightButtons}>
        {/* Botão de Toggle de Tema */}
        <TouchableOpacity onPress={toggleTheme} style={estilos.themeButton}>
          <Icon 
            name={darkMode ? "weather-sunny" : "weather-night"} 
            size={24} 
            color={darkMode ? "#BFD2F8" : "#FFFFFF"} 
          />
        </TouchableOpacity>

        {/* Botão para abrir o menu */}
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image
            source={require("../../assets/tracoOpcao.png")}
            style={[estilos.opcao, { tintColor: darkMode ? "#BFD2F8" : "#FFFFFF" }]}
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
              <View style={estilos.modalContainer}>
                {/* Cabeçalho do modal */}
                <View style={estilos.janelaTopo}>
                  <Image
                    source={require("../../assets/Logo.png")}
                    style={estilos.logoJanela}
                  />
                  <TouchableOpacity onPress={() => setModalVisivel(false)}>
                    <Icon name="close" size={25} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* Opções do menu */}
                <View style={estilos.filtro}>
                  {/* Home */}
                  <TouchableOpacity
                    onPress={() => navegarPara("HomePage")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="home" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Home</Text>
                  </TouchableOpacity>

                  {/* Perfil */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Perfil")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="account" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Perfil</Text>
                  </TouchableOpacity>

                  {/* Token */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Token")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="key" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Token</Text>
                  </TouchableOpacity>

                  {/* Sobre Nós */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Sobre")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="information" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Sobre Nós</Text>
                  </TouchableOpacity>

                  {/* Serviços */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Servicos")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="tools" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Serviços</Text>
                  </TouchableOpacity>

                  {/* Especialidades */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Especialidades")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="star" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Especialidades</Text>
                  </TouchableOpacity>

                  {/* Contato */}
                  <TouchableOpacity
                    onPress={() => navegarPara("Contato")}
                    style={estilos.botaoModal}
                  >
                    <Icon name="email" size={25} color={darkMode ? "#BFD2F8" : "#1F2B6C"} />
                    <Text style={estilos.textoModal}>Contato</Text>
                  </TouchableOpacity>

                  {/* Botão de Toggle de Tema dentro do menu */}
                  <TouchableOpacity
                    onPress={toggleTheme}
                    style={estilos.botaoModal}
                  >
                    <Icon 
                      name={darkMode ? "weather-sunny" : "weather-night"} 
                      size={25} 
                      color={darkMode ? "#BFD2F8" : "#1F2B6C"} 
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
                    style={estilos.botaoAgenda}
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

const getStyles = (darkMode) => StyleSheet.create({
  viewNav: {
    backgroundColor: darkMode ? "#1F2B6C" : "#1F2B6C", // Mantém azul escuro mesmo no modo claro
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  themeButton: {
    padding: 5,
  },
  opcao: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-end",
  },
  modalContainer: {
    width: 250,
    height: "80%", 
    backgroundColor: darkMode ? "#1F2B6C" : "#BFD2F8",
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  janelaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: darkMode ? "#121212" : "#1F2B6C",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
    color: darkMode ? "#BFD2F8" : "#1F2B6C",
    fontWeight: "bold",
    marginLeft: 15,
  },
  viewAgenda: {
    marginTop: 20,
    alignItems: "center",
  },
  botaoAgenda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: darkMode ? "#159EEC" : "#1F2B6C",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoAgenda: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
});