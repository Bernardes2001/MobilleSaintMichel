import React from "react";
import Header from "../Components/Header";
import { ScrollView, View } from "react-native";
import NavBar from "../Components/NavBar";
import Banner from "../Components/Banner";
import BodyHome from "../Components/BodyHome";
import Footer from "../Components/Footer";

export default function HomePage({navigation }) {

    return (
    
    <ScrollView>
        <View>
            <Header />
            <NavBar  navigation={navigation} />
            <Banner />
            <BodyHome />
            <Footer />
        </View>
    </ScrollView>
    )
}