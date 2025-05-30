import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import FloatingButton from "./FloatingButton";

const { height } = Dimensions.get("window");

const predefinedAnswers = {
  "🕒 Quais são os horários de atendimento?": "Nosso hospital funciona de segunda a sexta, das 7h às 18h.",
  "📍 Qual o endereço do hospital?": "Estamos localizados na Av. Central, 1234 - Centro.",
  "🩺 Quais convênios são aceitos?": "Atendemos convênios como Unimed, Bradesco Saúde, Amil e SulAmérica.",
  "📞 Qual o telefone de contato?": "Você pode nos ligar no (11) 1234-5678.",
  "💻 O hospital tem atendimento online?": "Sim, oferecemos teleconsultas. Agende pelo nosso site ou telefone.",
  "👨‍⚕️ Como agendar uma consulta?": "Você pode agendar pelo site, app ou ligando para (11) 1234-5678.",
};

const ChatModal = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(null); // 'hospital' ou 'chat'
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setMessages([
        { id: "1", from: "bot", text: "Olá, eu sou o ChatSaint! Como posso ajudar você hoje?" },
        {
          id: "2",
          from: "bot",
          type: "options",
          text: "Deseja saber mais sobre o hospital ou iniciar um chat livre?",
          options: [
            { label: "🏥 Saber sobre o hospital", value: "hospital" },
            { label: "💬 Chat livre", value: "chat" },
          ],
        },
      ]);
      setMode(null);
      setAwaitingContinue(false);
      setInput("");
    }
  }, [visible]);

  let messageIdCounter = 0;
  const generateId = () => {
    messageIdCounter++;
    return Date.now().toString() + "_" + messageIdCounter;
  };

  const addMessage = (msg) =>
    setMessages((prev) => [...prev, { ...msg, id: generateId() }]);

  const showHospitalOptions = () => {
    addMessage({
      from: "bot",
      type: "options",
      text: "Posso te ajudar com mais alguma coisa? Escolha uma opção:",
      options: [
        ...Object.keys(predefinedAnswers).map((q) => ({ label: q, value: q })),
        { label: "🔄 Ir para o chat livre", value: "__switch_to_chat" },
      ],
    });
  };

  const askContinueChat = () => {
    setAwaitingContinue(true);
    addMessage({
      from: "bot",
      type: "options",
      text: "Quer continuar o chat?",
      options: [
        { label: "Sim", value: "continue_yes" },
        { label: "Não", value: "continue_no" },
      ],
    });
  };

  const handleContinueResponse = (value) => {
    setAwaitingContinue(false);
    if (value === "continue_yes") {
      showHospitalOptions();
    } else {
      addMessage({ from: "bot", text: "Tudo bem! Se precisar de algo, é só chamar 😊" });
      setMode(null);
    }
  };

  const handleOptionSelect = (value) => {
    if (awaitingContinue) {
      handleContinueResponse(value);
      return;
    }

    if (value === "__switch_to_chat") {
      setMode("chat");
      addMessage({ from: "user", text: "Quero usar o chat livre" });
      addMessage({
        from: "bot",
        text: "Você está no modo de chat livre! Pode me perguntar o que quiser 😊",
      });
      return;
    }

    if (value === "hospital" || value === "chat") {
      setMode(value);
      addMessage({
        from: "user",
        text: value === "hospital" ? "Quero saber sobre o hospital" : "Quero usar o chat livre",
      });
      if (value === "hospital") {
        addMessage({
          from: "bot",
          text: "Ótimo! Aqui estão algumas perguntas que posso responder:",
        });
        showHospitalOptions();
      } else {
        addMessage({
          from: "bot",
          text: "Você está no modo de chat livre! Pode me perguntar o que quiser 😊",
        });
      }
      return;
    }

    if (predefinedAnswers[value]) {
      addMessage({ from: "user", text: value });
      addMessage({ from: "bot", text: predefinedAnswers[value] });
      askContinueChat();
      return;
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    addMessage({ from: "user", text: userMessage });
    setInput("");

    if (mode === "chat") {
      try {
        const response = await axios.post("http://10.92.198.33:5000/chatbot/chat", {
          message: userMessage,
        });

        console.log("Resposta do backend:", response.data);

        const botReply = response.data?.reply || "Desculpe, não entendi. Pode repetir?";

        addMessage({ from: "bot", text: botReply });
        askContinueChat();
      } catch (error) {
        console.error("Erro ao enviar mensagem para o backend:", error);
        addMessage({ from: "bot", text: "Desculpe, houve um erro no servidor." });
      }
    } else {
      setTimeout(() => {
        addMessage({
          from: "bot",
          text: "Entendi! Já estou analisando sua solicitação. 😉",
        });
        askContinueChat();
      }, 1000);
    }
  };

  const renderItem = ({ item }) => {
    if (item.type === "options") {
      return (
        <View style={styles.optionsContainer}>
          <Text style={styles.botText}>{item.text}</Text>
          <View style={styles.optionsButtons}>
            {item.options.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(opt.value)}
              >
                <Text style={styles.optionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          item.from === "user" ? styles.user : styles.bot,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>🤖 ChatSaint • Assistente de Saúde</Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {mode === "chat" && (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
              <View style={styles.inputArea}>
                <TextInput
                  style={styles.input}
                  value={input}
                  onChangeText={setInput}
                  placeholder="Digite sua mensagem..."
                  placeholderTextColor="#999"
                  onSubmitEditing={sendMessage}
                  returnKeyType="send"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                  <Text style={styles.sendText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>

        <View style={styles.floatingButtonWrapper}>
          <FloatingButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "flex-end",
  },
  modal: {
    height: height * 0.75,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  user: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  bot: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  botText: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionsButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  optionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
  floatingButtonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ChatModal;
