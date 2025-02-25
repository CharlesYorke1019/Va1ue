import { View, SafeAreaView, TouchableOpacity, Text, ScrollView } from "react-native";
import { useNavigation, useLinkTo } from '@react-navigation/native'
import { useMemo, useState, useEffect } from "react";
import { useRouter } from 'expo-router'
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'

import { Provider, useSelector } from "react-redux";
import { store, setNotifications, setLatestUpdate, getNotifications, getEmail } from "../models/store";

export function FeedDisplay({}) {

    const navigation = useNavigation();
    const router = useRouter();

    const elementsArr = [];
    const newElementsArr = [];
    const oldElementsArr = [];

    const [data, setData] = useState(JSON.parse(JSON.stringify(store.getState().notifications)));

    for (let i = data.length - 1; i >= 0; i--) {

        elementsArr.push(
            <View key={i} style={{width: '98%',  alignSelf: 'center', borderStyle: 'solid', borderColor: 'white', borderTopWidth: 2, borderBottomWidth: 2, marginTop: 10, padding: 20, marginBottom: '5%'}}>
                <TouchableOpacity style={{position: 'absolute', left: '5%', top: '6%'}}>
                    <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville'}}>X</Text>
                </TouchableOpacity>
                <Text style={{color: 'white', textAlign: 'center', marginBottom: '2%', fontFamily: 'Baskerville'}}>{data[i].payload.team1} has shifted {data[i].payload.team1OddsChange} {"\n"} (started at {data[i].payload.team1OriginalOdds} & now at {data[i].payload.team1UpdatedOdds})</Text>
                <Text style={{color: 'white', textAlign: 'center', marginBottom: '2%', fontFamily: 'Baskerville'}}>{data[i].payload.team2} has shifted {data[i].payload.team2OddsChange} {"\n"} (started at {data[i].payload.team2OriginalOdds} & now at {data[i].payload.team2UpdatedOdds})</Text>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville'}}>Location: {data[i].payload.location}</Text>
                <Text style={{color: '#BDABAB', textAlign: 'center', fontFamily: 'Baskerville', marginTop: '5%'}}>{returnHowLongAgo(data[i].payload.committedStamp) > 2 ? `${returnHowLongAgo(data[i].payload.committedStamp)} min ago` : 'New!'}</Text>
                <TouchableOpacity style={{alignSelf: 'center', backgroundColor: 'green', marginTop: '5%'}} 
                    onPress={() => {
                        router.push(data[i].payload.url)
                    }}
                >
                    <Text style={{color: 'white', paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, fontFamily: 'Baskerville'}}>GO</Text>
                </TouchableOpacity>
            </View> 
        )

    }

    useEffect(() => {

        socket.off('receive_ping').on('receive_ping', async (sentData, notificationData) => {

            console.log('received');

            let dateHolder = Date.now();
            let currentDate = new Date(dateHolder);

            let timeRange = currentDate.setMinutes(currentDate.getMinutes() - 1);

            notificationData.forEach((el, index) => {
                
                let notificationObj = {

                    team1: el.info.team1,
                    team2: el.info.team2,
                    team1OddsChange: el.info.team1OddsChange,
                    team2OddsChange: el.info.team2OddsChange,
                    team1OriginalOdds: el.info.team1OriginalOdds,
                    team2OriginalOdds: el.info.team2OriginalOdds,
                    team1UpdatedOdds: el.info.team1UpdatedOdds,
                    team2UpdatedOdds: el.info.team2UpdatedOdds,
                    location: el.info.location,
                    committedStamp: el.committedStamp,
                    sent: el.sent,
                    url: el.url

                };

                store.dispatch(setNotifications(notificationObj));

            });

            store.dispatch(setLatestUpdate(currentDate.toString()));

            setData(JSON.parse(JSON.stringify(store.getState().notifications)));            

        });

    }, [])

    function navigate() {
        socket.emit('leaveRoomEmit')
        navigation.navigate('Home')
    }

    function returnHowLongAgo(committedStamp) {

        const now = new Date();
        const past = new Date(committedStamp);
        const diffInMs = now - past;
        const diffInMinutes = Math.floor(diffInMs / 60000); // 60000 ms in a minute
        return diffInMinutes;

    }

    return (

        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>

            <View style={{flex: 1, backgroundColor: 'black'}}>

                <View style={{width: '98%', alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%'}}>

                    <TouchableOpacity style={{marginBottom: '6%'}}
                        onPress={() => navigate()}
                    >
                        <Icon name="home" color={'white'} size={28} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 28, fontFamily: 'Baskerville-Bold'}}>
                        NCAA BASKETBALL
                    </Text>

                </View>

                <ScrollView style={{position: 'absolute', height: '80%', width: '98%', alignSelf: 'center', top: '17.5%', borderColor: 'white', borderTopWidth: 1, borderBottomWidth: 1}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} scrollsToTop={false} showsVerticalScrollIndicator={false}>
                    <Text style={{fontSize: 18, textAlign: 'center', alignSelf: 'center', fontFamily: 'Baskerville', color: 'white', marginTop: '5%'}}>Latest Updates</Text>
                    { elementsArr }
                </ScrollView>
                
                

            </View>

        </SafeAreaView>

    )

}