import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import BannerSobre from "../Components/BannerSobre";
import BodySobre from "../Components/BodySobre";

export default function Sobre({navigation}) {

    return (
    
      <ScrollView>
        <View >
            <Header />
            <NavBar  navigation={navigation}/>
            <BannerSobre />
            <BodySobre />
            <Footer />
            </View>
      </ScrollView>
    )
}