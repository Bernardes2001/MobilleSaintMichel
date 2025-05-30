import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import BannerAgendamento from "../Components/BannerAgendamento";
import BodyAgendamento from "../Components/BodyAgendamento";
import Footer from "../Components/Footer";

export default function Agendamento({navigation}) {

    return (
    <ScrollView>
        <View>
        <Header />
        <NavBar  navigation={navigation}/>
        <BannerAgendamento />
        <BodyAgendamento />
        <Footer />
        </View>
    </ScrollView>
    )
}