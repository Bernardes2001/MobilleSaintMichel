import React, { useContext } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from '../ThemeContext';

export default function CompactHeader() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const styles = getStyles(darkMode);

    return (
        <View style={styles.container}>
       

            <View style={styles.row}>
                <View style={styles.item}>
                    <Image 
                        source={require('../../assets/IconTelefone.png')} 
                        style={[styles.icon, { tintColor: styles.iconColor }]} 
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>EMERGÊNCIA</Text>
                        <Text style={styles.value}>(11) 6818-1255</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <Image 
                        source={require('../../assets/IconLocal.png')} 
                        style={[styles.icon, { tintColor: styles.iconColor }]} 
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>LOCALIZAÇÃO</Text>
                        <Text style={styles.value}>Av. Marechal Tito, 340</Text>
                    </View>
                </View>
            </View>

            <View style={styles.hours}>
                <Image 
                    source={require('../../assets/IconRelogio.png')} 
                    style={[styles.icon, { tintColor: styles.iconColor }]} 
                />
                <Text style={styles.hoursLabel}>HORÁRIO: </Text>
                <Text style={styles.hoursText}>09:00 - 20:00</Text>
            </View>
        </View>
    )
}

const getStyles = (darkMode) => StyleSheet.create({
    container: {
        backgroundColor: darkMode ? '#1E1E2E' : '#FFF',
        padding: 16,
        paddingBottom: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
    textContainer: {
        marginLeft: 8,
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconColor: darkMode ? '#BFD2F8' : '#1F2B6C',
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
    },
    value: {
        fontSize: 14,
        color: '#159EEC',
        marginTop: 2,
    },
    hours: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'center',
    },
    hoursLabel: {
        fontSize: 14,
        color: darkMode ? '#BFD2F8' : '#1F2B6C',
        marginLeft: 8,
        fontWeight: '600',
    },
    hoursText: {
        fontSize: 14,
        color: '#159EEC',
        fontWeight: '500',
    },
    toggleButton: {
        backgroundColor: darkMode ? '#1F2B6C' : '#159EEC',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 8,
    },
    toggleButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});