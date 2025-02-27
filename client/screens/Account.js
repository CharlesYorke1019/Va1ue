import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { store, setUserInfoLogOut } from "../models/store";


export function Account({}) {

    const navigation = useNavigation();

    function navigate() {
        navigation.navigate('Home')
    }

    function userLogsOut() {

        store.dispatch(setUserInfoLogOut());
        navigation.navigate('Index');


    }

    const [email, setEmail] = useState(store.getState().email);

    return (
        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        
        <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>

            <TouchableOpacity style={{marginTop: '6%', alignSelf: 'center'}}
                onPress={() => navigate()}
            >
                <Icon name="home" color={'white'} size={28} />
            </TouchableOpacity>

            <ScrollView style={{position: 'absolute', height: '80%', width: '98%', alignSelf: 'center', top: '17.5%', borderColor: 'white', borderTopWidth: 1, borderBottomWidth: 1}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} scrollsToTop={false} showsVerticalScrollIndicator={false}>

                <Text style={{color: 'white', fontSize: 24, fontFamily: 'Baskerville', marginTop: '10%'}}>Email: <Text style={{fontWeight: 600}}>{ email }</Text></Text>

                <Text style={{color: 'white', fontSize: 24, fontFamily: 'Baskerville', marginTop: '10%'}}>Password: <Text style={{fontWeight: 600}}>********</Text></Text>

                <Text style={{color: 'white', fontSize: 24, fontFamily: 'Baskerville', marginTop: '10%'}}>Subscription: <Text style={{fontWeight: 600}}>none</Text></Text>

                <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', alignSelf: 'center', marginTop: '40%', borderRadius: 5}}
                    onPress={() => userLogsOut()}
                >
                    <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, paddingLeft: 17, paddingRight: 17, fontFamily: 'Baskerville'}}>Sign Out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderWidth: 1, borderColor: 'lightcoral', alignSelf: 'center', marginTop: '10%', borderRadius: 5}}
                    
                >
                    <Text style={{color: 'lightcoral', paddingTop: 7, paddingBottom: 7, paddingLeft: 17, paddingRight: 17, fontFamily: 'Baskerville'}}>Delete Account</Text>
                </TouchableOpacity>


            </ScrollView>



        </View>

        </SafeAreaView>
    )

}