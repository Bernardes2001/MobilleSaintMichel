import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import MedicoEspecialidade from "../Components/MedicoEspecialidade";
import BannerDoutores from "../Components/BannerDoutores";

export default function Especialidades({navigation}) {

    return (
    <ScrollView>
        <View>
            <Header />
            <NavBar  navigation={navigation}/>
            <BannerDoutores />
            <MedicoEspecialidade />
            <Footer />
        </View>
    </ScrollView>
    )
}

const estilos = StyleSheet.create({



}) 