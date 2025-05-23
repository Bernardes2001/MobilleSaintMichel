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
  const [hasNotifications, setHasNotifications] = useState(true); // Estado para controlar se há notificações
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const estilos = getStyles(darkMode);

  const navegarPara = (tela) => {
    setModalVisivel(false);
    navigation.navigate(tela);
  };

  const menuOptions = [
    { name: "HomePage", icon: "home", label: "Home" },
    { name: "Perfil", icon: "account", label: "Perfil" },
    { name: "Sobre", icon: "information", label: "Sobre Nós" },
    { name: "Servicos", icon: "tools", label: "Serviços" },
    { name: "Especialidades", icon: "star", label: "Especialidades" },
    { name: "Contato", icon: "email", label: "Contato" },
    { name: "Notificacoes", icon: "bell", label: "Notificações" }, // Adicionado item de menu para notificações
  ];

  const handleNotificationPress = () => {
    setHasNotifications(false); // Marcar notificações como lidas
    navigation.navigate("Notificacoes"); // Navegar para a tela de notificações
  };

  return (
    <View style={estilos.viewNav}>
      {/* Logo - Using the same logo with tint color adjustment */}
      <Image 
        source={require("../../assets/Logo.png")} 
        style={[estilos.logo, { tintColor: darkMode ? "#BFD2F8" : null }]} 
      />

      {/* Right buttons */}
      <View style={estilos.rightButtons}>
        {/* Botão de notificações */}
        <TouchableOpacity onPress={handleNotificationPress} style={estilos.notificationButton}>
          <Icon 
            name={hasNotifications ? "bell" : "bell-outline"} 
            size={24} 
            color={estilos.iconColor} 
          />
          {hasNotifications && (
            <View style={estilos.notificationBadge} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme} style={estilos.themeButton}>
          <Icon 
            name={darkMode ? "weather-sunny" : "weather-night"} 
            size={24} 
            color={estilos.iconColor} 
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Image
            source={require("../../assets/tracoOpcao.png")}
            style={[estilos.opcao, { tintColor: estilos.iconColor }]}
          />
        </TouchableOpacity>
      </View>

      {/* Menu modal */}
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
                {/* Modal header */}
                <View style={estilos.janelaTopo}>
                  <Image
                    source={require("../../assets/Logo.png")}
                    style={[estilos.logoJanela, { tintColor: "#FFFFFF" }]}
                  />
                  <TouchableOpacity onPress={() => setModalVisivel(false)}>
                    <Icon name="close" size={25} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* Menu options */}
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
                      {option.name === "Notificacoes" && hasNotifications && (
                        <View style={estilos.modalNotificationBadge} />
                      )}
                    </TouchableOpacity>
                  ))}

                  {/* Theme toggle inside menu */}
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

                {/* Appointments button */}
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
    backgroundColor: darkMode ? "#1E1E2E" : "#1F2B6C", 
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 50,
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
  notificationButton: {
    padding: 5,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF5252',
    borderRadius: 5,
    width: 10,
    height: 10,
  },
  modalNotificationBadge: {
    backgroundColor: '#FF5252',
    borderRadius: 5,
    width: 10,
    height: 10,
    marginLeft: 10,
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
    width: 250,
    height: "85%", 
    backgroundColor: darkMode ? "#1E1E2E" : "#BFD2F8",
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
    backgroundColor: darkMode ? "#1E1E2E" : "#1F2B6C",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  logoJanela: {
    width: 80,
    height: 50,
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