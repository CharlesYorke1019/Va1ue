import { SafeAreaView, View, Text, TouchableOpacity, Animated } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'
// import { Provider } from "react-redux";
// import { store } from "@/models/store";
import { useNavigation } from '@react-navigation/native'
import { store } from "../models/store";


export function Home() {

    const navigation = useNavigation();

    const [menuDisplay, setMenuDisplay] = useState(false);
    const [menuAnimation, setMenuAnimation] = useState(false);

    const leftValue = useState(new Animated.Value(0))[0];

    function toggleMenu() {

        moveMenu();
        triggerGameMenuAnimation();

    }

    function navigate() {

        socket.emit('joinRoomEmit');

        navigation.navigate('FeedDisplay')

    }

    function moveMenu () {

        if (!menuDisplay) {
            Animated.timing(leftValue, {
                toValue: 300,
                duration: 400,
                useNativeDriver: false
            }).start()

        } else {
            Animated.timing(leftValue, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()
        };

    };

    function triggerGameMenuAnimation () {
        if (!menuDisplay) {
            setMenuDisplay(true);
        } else {
            setMenuAnimation(true);
            setTimeout(() => {
                setMenuDisplay(false);
                setMenuAnimation(false);
            }, 400)
        }
    };

    return (
        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>

            <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>

                <TouchableOpacity style={{position: 'absolute', top: '2.5%', left: '10%', display: !menuDisplay ? 'flex' : 'none'}}
                    onPress={() => toggleMenu()}
                >

                    <Icon name="menu" color={'white'} size={40} />

                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', top: '20%', borderWidth: 1, borderColor: 'white'}}
                    onPress={() => navigate()}
                >
                    <Text style={{textAlign: 'center', fontSize: 16, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontFamily: 'Baskerville-Bold'}}>NCAA Basketball</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', alignSelf: 'center', top: '30%', borderWidth: 1, borderColor: 'white'}}>
                    <Text style={{textAlign: 'center', fontSize: 16, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontFamily: 'Baskerville-Bold'}}>NBA Basketball</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    )

}