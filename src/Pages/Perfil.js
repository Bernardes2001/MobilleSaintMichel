import react from "react";
import { ScrollView, View } from "react-native";
import NavBar from "../Components/NavBar";
import Header from "../Components/Header";
import BodyPerfil from "../Components/BodyPerfil";

export default function Perfil({navigation}) {

    return (

        <View>
            <ScrollView>
                <Header/>
                <NavBar navigation={navigation}/>
                <BodyPerfil />
            </ScrollView>
        </View>

    )
}