import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import BannerContato from "../Components/BannerContato";
import ContainerContato from "../Components/ContainerContato";
import Footer from "../Components/Footer";

export default function Contato({navigation}) {

    return (

        <ScrollView>
            <View>
                <Header />
                <NavBar  navigation={navigation}/>
                <BannerContato />
                <ContainerContato />
                <Footer />
            </View>
        </ScrollView>

    )
}