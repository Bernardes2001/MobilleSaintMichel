import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Banner from "../Components/Banner";
import BannerServices from "../Components/BannerServices";
import Footer from "../Components/Footer";
import BodyServices from "../Components/BodyServices";

export default function Servicos({navigation}) {

    return (
    
        <ScrollView>
        <View>
            <Header />
            <NavBar  navigation={navigation} />
            <BannerServices />
            <BodyServices />
            <Footer />
        </View>
        </ScrollView>

    )
}

const estilos = StyleSheet.create({

})