import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { useMemo, useState, useEffect } from "react";
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'
import { FeedComponent } from "../components/FeedComponent";
import { store, setNotifications, setLatestUpdate } from "../models/store";

export function FeedDisplay1({}) {

    const navigation = useNavigation();

    let tHolder = JSON.parse(JSON.stringify(store.getState().notifications));

    let arrHolder = [];

    tHolder.forEach((el) => {

        if (el.payload.type === 'basketball_ncaab') {

            arrHolder.push(el)

        }

    })

    const [data, setData] = useState(arrHolder);

    useEffect(() => {

        socket.off('receive_ping').on('receive_ping', async (notificationData) => {

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
                    url: el.url,
                    type: el.type

                };

                store.dispatch(setNotifications(notificationObj));

            });

            store.dispatch(setLatestUpdate(currentDate.toString()));

            let final = [];

            let holder = JSON.parse(JSON.stringify(store.getState().notifications));

            holder.forEach((el) => {
                if (el.payload.type === 'basketball_ncaab') {
                    final.push(el);
                }
            })
            
            setData(JSON.parse(JSON.stringify(final))); 

            // setData(JSON.parse(JSON.stringify(store.getState().notifications))); 

        });

    }, [])

    function navigate(room) {
        socket.emit('leaveRoomEmit', room)
        navigation.navigate('Home')
    }

    return (

        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>

            <View style={{flex: 1, backgroundColor: 'black'}}>

                <View style={{width: '98%', alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%'}}>

                    <TouchableOpacity style={{marginBottom: '6%'}}
                        onPress={() => navigate('basketball_ncaab')}
                    >
                        <Icon name="home" color={'white'} size={28} />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 28, fontFamily: 'Baskerville-Bold'}}>
                        NCAA BASKETBALL
                    </Text>

                </View>

                <FeedComponent data={data} />

            </View>

        </SafeAreaView>

    )

}