import { SafeAreaView, View, Text, TouchableOpacity, Animated } from "react-native";
import { useState } from "react";
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { store } from "../models/store";
import { Menu } from "../components/Menu";

export function Home() {

    const navigation = useNavigation();

    const [menuDisplay, setMenuDisplay] = useState(false);
    const [menuAnimation, setMenuAnimation] = useState(false);
    const [token, setToken] = useState(store.getState().token);

    const leftValue = useState(new Animated.Value(0))[0];

    function toggleMenu() {

        moveMenu();
        triggerGameMenuAnimation();

    }

    function navigate(room, route) {

        socket.emit('joinRoomEmit', room, token);

        navigation.navigate(route)

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

    function activeChannelsIncludeChannel(channel) {

        if (store.getState().channelsActive.includes('all')) {
            return true;
        } else {
            if (store.getState().channelsActive.includes(channel)) {
                return true;
            } else {
                return false;
            }
        }
    }

    return (
        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>

            <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>

                <Menu display={menuDisplay} setMenuDisplay={setMenuDisplay} toggleMenuFunc={toggleMenu} leftValue={leftValue} />

                <TouchableOpacity style={{position: 'absolute', top: '4%', left: '10%', opacity: menuDisplay ? 0.5 : 1}}
                    onPress={() => toggleMenu()}
                >

                    <Icon name="menu" color={'white'} size={40} />

                </TouchableOpacity>

                <Text style={{color: 'white', alignSelf: 'center', fontFamily: 'Baskerville-Bold', position: 'absolute', top: '15%', fontSize: 42, opacity: menuDisplay ? .5 : 1}}>Channels</Text>

                <View style={{width: '95%', display: 'flex', flexDirection: 'row', alignSelf: 'center', position: 'absolute', top: '25%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white', borderRadius: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', opacity: menuDisplay ? .5 : 1}}>

                    <TouchableOpacity style={{alignSelf: 'center', marginTop: '10%', marginBottom: '2.5%', marginLeft: '2.5%', marginRight: '2.5%', borderWidth: 1, borderColor: 'white', borderRadius: 5, opacity: menuDisplay ? 0.5 : 1, display: activeChannelsIncludeChannel('NCAABASKETBALL') ? 'flex' : 'none'}}
                        onPress={() => navigate('basketball_ncaab', 'FeedDisplay1')}
                    >
                        <Text style={{textAlign: 'center', fontSize: 14, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontFamily: 'Baskerville'}}>NCAA Basketball</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf: 'center', marginBottom: '2.5%', marginTop: '2.5%', marginLeft: '2.5%', marginRight: '2.5%', borderWidth: 1, borderColor: 'white', borderRadius: 5, opacity: menuDisplay ? 0.5 : 1, display: activeChannelsIncludeChannel('NBABASKETBALL') ? 'flex' : 'none'}}
                        onPress={() => navigate('basketball_nba', 'FeedDisplay2')}
                    >
                        <Text style={{textAlign: 'center', fontSize: 14, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontFamily: 'Baskerville'}}>NBA Basketball</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf: 'center', marginBottom: '2.5%', marginTop: '2.5%', marginLeft: '2.5%', marginRight: '2.5%',borderWidth: 1, borderColor: 'white', borderRadius: 5, opacity: menuDisplay ? 0.5 : 1, display: activeChannelsIncludeChannel('MLBBASEBALL') ? 'flex' : 'none'}}
                        // onPress={() => navigate('basketball_nba', 'FeedDisplay2')}
                    >
                        <Text style={{textAlign: 'center', fontSize: 14, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontFamily: 'Baskerville'}}>MLB Baseball</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf: 'center', marginBottom: '2.5%', marginTop: '2.5%', marginLeft: '2.5%', marginRight: '2.5%', borderWidth: 1, borderColor: 'white', borderRadius: 5, opacity: menuDisplay ? 0.5 : 1, display: activeChannelsIncludeChannel('NFLFOOTBALL') ? 'flex' : 'none'}}
                        // onPress={() => navigate('basketball_nba', 'FeedDisplay2')}
                    >
                        <Text style={{textAlign: 'center', fontSize: 14, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontFamily: 'Baskerville'}}>NFL Football</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{alignSelf: 'center', marginBottom: '10%', marginTop: '2.5%', marginLeft: '2.5%', marginRight: '2.5%', borderWidth: 1, borderColor: 'white', borderRadius: 5, opacity: menuDisplay ? 0.5 : 1, display: activeChannelsIncludeChannel('EUROPEANFOOTBALL') ? 'flex' : 'none'}}
                        onPress={() => navigate('soccer_uefa_champs_league', 'FeedDisplay3')}
                    >
                        <Text style={{textAlign: 'center', fontSize: 14, color: 'white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontFamily: 'Baskerville'}}>European Football</Text>
                    </TouchableOpacity>


                </View>

            </View>

        </SafeAreaView>

    )

}