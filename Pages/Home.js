import React, { useState, useEffect, use } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const initialHistory = [
    {id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present"},
    {id: "2", course: "Database System", date: "2026-03-02", status: "Present"},
    {id: "3", course: "Operating System", date: "2026-03-03", status: "Absent"},
    {id: "4", course: "Computer Network", date: "2026-03-04", status: "Present"},
    {id: "5", course: "Artificial Intelligence", date: "2026-03-05", status: "Present"},
    {id: "6", course: "Web Programming", date: "2026-03-06", status: "Absent"},
    {id: "7", course: "Software Engineering", date: "2026-03-07", status: "Present"},
    {id: "8", course: "Human Computer Interaction", date: "2026-03-08", status: "Present"},
    {id: "9", course: "Data Mining", date: "2026-03-09", status: "Absent"},
    {id: "10", course: "Machine Learning", date: "2026-03-10", status: "Present"},
    {id: "11", course: "Computer Graphics", date: "2026-03-11", status: "Present"},
    {id: "12", course: "Cyber Security", date: "2026-03-12", status: "Absent"},
    {id: "13", course: "Network Security", date: "2026-03-13", status: "Present"},
    {id: "14", course: "Cloud Computing", date: "2026-03-14", status: "Present"},
    {id: "15", course: "Big Data", date: "2026-03-15", status: "Absent"},
    {id: "16", course: "Information Retrieval", date: "2026-03-16", status: "Present"},
    {id: "17", course: "Distributed System", date: "2026-03-17", status: "Present"},
    {id: "18", course: "Parallel Computing", date: "2026-03-18", status: "Absent"},
    {id: "19", course: "Game Development", date: "2026-03-19", status: "Present"},
    {id: "20", course: "Mobile Security", date: "2026-03-20", status: "Present"},
    {id: "21", course: "DevOps", date: "2026-03-21", status: "Absent"},
];

const Home = () => {

    const [historyData, setHistoryData] = useState(initialHistory);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState('memuat jam...');

    useEffect(() => {
        const timer = setInterval(() => {
            const timeString = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentTime(timeString);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        if (isCheckedIn) {
            Alert.alert("Perhatian", "anda sudah melakukan check in untuk kelas ini.");
            return;
        }

        const newAttendance = {
            id: Date.now().toString(),
            course: "Mobile Programming",
            date: new Date().toLocaleDateString('id-ID'),
            status: "Present",
        };

        setHistoryData([newAttendance, ...historyData]);
        setIsCheckedIn(true);
        Alert.alert("Sukses", `Anda berhasil check in pada pukul ${currentTime}.`);
    };


    const renderItem = ({ item }) => (
        <View style={styles.item}>

            <View>
                <Text style={styles.course}>{item.course}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={{flexDirection:"row", alignItems:"center"}}>
                <MaterialIcons
                    name={item.status === "Present" ? "check-circle" : "cancel"}
                    size={18}
                    color={item.status === "Present" ? "green" : "red"}
                />

                <Text
                    style={
                        item.status === "Present"
                        ? styles.present
                        : styles.absent
                    }
                >
                    {item.status}
                </Text>
            </View>

        </View>
    );
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Attendance App</Text>
                <Text style={styles.clockText}>{currentTime}</Text>
            </View>

                <View style={styles.card}>
                    <View style={styles.icon}>
                        <MaterialIcons name="person" size={40} color="#555" />
                    </View>
                    <View>
                        <Text style={styles.name}>Dipras</Text>
                        <Text>NIM : 0920240005</Text>
                        <Text>Class : Informatika-2B</Text>
                    </View>
                </View>

                <View style={styles.classCard}>
                    <Text style={styles.subtitle}>Today's Class</Text>
                    <Text>Mobile Programming</Text>
                    <Text>08:00 - 10:00</Text>
                    <Text>Lab 3</Text>

                    <TouchableOpacity style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]} 
                         onPress={handleCheckIn} disabled={isCheckedIn}>
                        <Text style={styles.buttonText}>
                            {isCheckedIn ? "Checked In" : "CHECK IN"}
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.classCard}>
                <Text style={styles.subtitle}>Attendance History</Text>
                <FlatList 
                    data={historyData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    clockText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007AFF",
        fontVariant: ['tabular-nums'],
    },

    buttonActive: {
        backgroundColor: "#007AFF",
    },

        buttonDisabled: {
        backgroundColor: "#A0C4FF",
    },

    container: {
        flex: 1,
       backgroundColor: "#f5f5f5"
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    card: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },

    icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    
    classCard: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
     },

     subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
     },

        button: {
        marginTop: 10,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
     },

     buttonText: {   
        color: "white",
     },

     content: {
        padding: 20,
        paddingBottom: 40,
     },

     item:{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
     },

    course: {
        fontSize: 16
    },

    date: {
        fontSize: 12,
        color: "gray",
    },

    present: {
        color: "green",
        fontWeight: "bold",
    },

    absent: {
        color: "red",
        fontWeight: "bold",
    }
});