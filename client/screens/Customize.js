import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { store, setBooksActive, setChannelsActive } from "../models/store";

export function Customize({}) {

    const navigation = useNavigation();

    const [booksActiveDisplay, setBooksActiveDisplay] = useState(store.getState().booksActive);
    const [channelsActiveDisplay, setChannelsActiveDisplay] = useState(store.getState().channelsActive);

    const [initEditBooks, setInitEditBooks] = useState(false);
    const [initEditChannels, setInitEditChannels] = useState(false);

    const [userId, setUserId] = useState(store.getState().id);

    let [test, setTest] = useState('');
    let [test2, setTest2] = useState('');

    function navigate() {
        navigation.navigate('Home')
    }

    function toggleEditBooks() {

        if (initEditBooks) {

            const arrHolder = test.split('_');

            const results = arrHolder.filter((el) => el != '');

            if (results.length > 0) {

                store.dispatch(setBooksActive(results));

                socket.emit('userChangesActiveBooks', results, userId);
    
                setBooksActiveDisplay(store.getState().booksActive);

            }

            setTest('');

        } else {
            let str = '';

            booksActiveDisplay.forEach((el) => {
                str += el + '_'
            })

        }

        setInitEditBooks(!initEditBooks);

    }

    function pressBookActive(book) {

        let str = test;

        if (book != 'all') {

            if (str.includes('all_')) {
                
                str = str.replace('all_', '');

            }

            let holder = book + '_'

            if (str.includes(holder)) {


                str = str.replace(holder, '')

            } else {

                str += holder

            }

            setTest(str);

        } else {

            str = 'all_'

            setTest(str);

        }

    }

    function includedInBooksActive(book) {

        if (booksActiveDisplay.includes(book)) {
            return true;
        } else {
            return false;
        }

    }

    function toggleEditChannels() {

        if (initEditChannels) {

            const arrHolder = test2.split('_');

            const results = arrHolder.filter((el) => el != '');

            if (results.length > 0) {

                store.dispatch(setChannelsActive(results));

                socket.emit('userChangesActiveChannels', results, userId);

                setChannelsActiveDisplay(store.getState().channelsActive);

            }

            setTest2('');

        } else {

            let str = '';

            channelsActiveDisplay.forEach((el) => {
                str += el + '_'
            })

        }

        setInitEditChannels(!initEditChannels);
    }

    function pressChannelActive(channel) {

        let str = test2;

        if (channel != 'all') {

            if (str.includes('all_')) {

                str = str.replace('all_', '');

            }

            let holder = channel += '_';

            if (str.includes(holder)) {

                str = str.replace(holder, '');

            } else {

                str += holder;

            }

            setTest2(str);

        } else {

            str = 'all_';

            setTest2(str);

        }

    }

    function includedInChannelsActive(channel) {

        if (channelsActiveDisplay.includes(channel)) {
            return true;
        } else {
            return false;
        }

    }

    return (

        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        
            <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>

                <TouchableOpacity style={{marginTop: '6%', alignSelf: 'center'}}
                    onPress={() => navigate()}
                >
                    <Icon name="home" color={'white'} size={28} />
                </TouchableOpacity>

                <View style={{borderWidth: 1, borderColor: initEditBooks ? 'lightcoral' : 'white', height: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center', borderRadius: 5, marginTop: '10%'}}>

                    <TouchableOpacity style={{borderColor: 'white', borderRightWidth: 1, borderBottomWidth: 1, borderTopRightRadius: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 1, position: 'absolute', left: '0%', top: '0%'}}
                        onPress={() => toggleEditBooks()}
                    >
                        <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville', padding: 8}}>{!initEditBooks ? 'Edit' : 'Save'}</Text>
                    </TouchableOpacity>

                    <Text style={{fontSize: 28, color: 'white', fontFamily: 'Baskerville-Bold', alignSelf: 'center', marginTop: '-5%', marginBottom: '10%'}}>Books Active</Text>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: !initEditBooks && includedInBooksActive('all') ? 'lightcoral' : initEditBooks && test.includes('all_') ? 'lightcoral' : 'black'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('all')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, paddingLeft: 17, paddingRight: 17, fontFamily: 'Baskerville'}}>All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('FanDuel') ? 'lightcoral' : initEditBooks && test.includes('FanDuel_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('FanDuel')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>FanDuel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', marginRight: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('DraftKings') ? 'lightcoral' : initEditBooks && test.includes('DraftKings_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('DraftKings')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, fontFamily: 'Baskerville', textAlign: 'center'}}>DraftKings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginRight: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('Caesars') ? 'lightcoral' : initEditBooks && test.includes('Caesars_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('Caesars')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, fontFamily: 'Baskerville', textAlign: 'center'}}>Caesars</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('BetRivers') ? 'lightcoral' : initEditBooks && test.includes('BetRivers_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('BetRivers')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>BetRivers</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', marginRight: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('BetMGM') ? 'lightcoral' : initEditBooks && test.includes('BetMGM_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('BetMGM')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, fontFamily: 'Baskerville', textAlign: 'center'}}>BetMGM</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginRight: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('BetUS') ? 'lightcoral' : initEditBooks && test.includes('BetUS_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('BetUS')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, fontFamily: 'Baskerville', textAlign: 'center'}}>BetUS</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', backgroundColor: !initEditBooks && includedInBooksActive('Bovada') ? 'lightcoral' : initEditBooks && test.includes('Bovada_') ? 'lightcoral' : 'black', width: '30%'}} disabled={!initEditBooks}
                            onPress={() => pressBookActive('Bovada')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>Bovada</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{borderWidth: 1, borderColor: initEditChannels ? 'lightcoral' : 'white', height: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center', borderRadius: 5, marginTop: '10%'}}>

                    <TouchableOpacity style={{borderColor: 'white', borderRightWidth: 1, borderBottomWidth: 1, borderTopRightRadius: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 1, position: 'absolute', left: '0%', top: '0%'}}
                        onPress={() => toggleEditChannels()}
                    >
                        <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville', padding: 8}}>{!initEditChannels ? 'Edit' : 'Save'}</Text>
                    </TouchableOpacity>

                    <Text style={{fontSize: 28, color: 'white', fontFamily: 'Baskerville-Bold', alignSelf: 'center', marginTop: '-5%', marginBottom: '10%'}}>Channels Active</Text>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: !initEditChannels && includedInChannelsActive('all') ? 'lightcoral' : initEditChannels && test2.includes('all_') ? 'lightcoral' : 'black'}} disabled={!initEditChannels}
                            onPress={() => pressChannelActive('all')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, paddingLeft: 17, paddingRight: 17, fontFamily: 'Baskerville'}}>All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%', backgroundColor: !initEditChannels && includedInChannelsActive('NCAABASKETBALL') ? 'lightcoral' : initEditChannels && test2.includes('NCAABASKETBALL_') ? 'lightcoral' : 'black'}} disabled={!initEditChannels}
                            onPress={() => pressChannelActive('NCAABASKETBALL')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>NCAA Basketball</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%', backgroundColor: !initEditChannels && includedInChannelsActive('NBABASKETBALL') ? 'lightcoral' : initEditChannels && test2.includes('NBABASKETBALL_') ? 'lightcoral' : 'black'}} disabled={!initEditChannels}
                            onPress={() => pressChannelActive('NBABASKETBALL')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>NBA Basketball</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%', backgroundColor: !initEditChannels && includedInChannelsActive('MLBBASEBALL') ? 'lightcoral' : initEditChannels && test2.includes('MLBBASEBALL_') ? 'lightcoral' : 'black'}} disabled={!initEditChannels}
                            onPress={() => pressChannelActive('MLBBASEBALL')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>MLB Baseball</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%', backgroundColor: !initEditChannels && includedInChannelsActive('NFLFOOTBALL') ? 'lightcoral' : initEditChannels && test2.includes('NFLFOOTBALL_') ? 'lightcoral' : 'black'}} disabled={!initEditChannels}
                            onPress={() => pressChannelActive('NFLFOOTBALL')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>NFL Football</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%', backgroundColor: !initEditChannels && includedInChannelsActive('EUROPEANFOOTBALL') ? 'lightcoral' : initEditChannels && test2.includes('EUROPEANFOOTBALL_') ? 'lightcoral' : 'black'}} disabled={!initEditChannels}
                            onPress={() => pressChannelActive('EUROPEANFOOTBALL')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>European Football</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )

}