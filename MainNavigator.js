import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/Pages/HomePage";
import Sobre from "./src/Pages/Sobre";
import Servicos from "./src/Pages/Servicos";
import Especialidades from "./src/Pages/Especialidades";
import Contato from "./src/Pages/Contato";
import Agendamento from "./src/Pages/Agendamento";
import Login from "./src/Pages/Login";
import Cadastro from "./src/Pages/Cadastro";
import Perfil from "./src/Pages/Perfil";
import Senha from "./src/Pages/Senha";
import Notificacoes from "./src/Pages/Notificacoes";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="Sobre" component={Sobre} />
                <Stack.Screen name="Servicos" component={Servicos} />
                <Stack.Screen name="Especialidades" component={Especialidades} />
                <Stack.Screen name="Contato" component={Contato} />
                <Stack.Screen name="Agendamentos" component={Agendamento} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Perfil" component={Perfil} />
                <Stack.Screen name="Senha" component={Senha} />
                <Stack.Screen name="Notificacoes" component={Notificacoes}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
