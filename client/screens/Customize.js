import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import socket from "../models/socket";
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { store, setBooksActive } from "../models/store";

export function Customize({}) {

    const navigation = useNavigation();

    const [booksActiveDisplay, setBooksActiveDisplay] = useState(store.getState().booksActive);

    const [initEditBooks, setInitEditBooks] = useState(false);

    const [userId, setUserId] = useState(store.getState().id);

    let [test, setTest] = useState('');

    function navigate() {
        navigation.navigate('Home')
    }

    function toggleEditBooks() {

        if (initEditBooks) {


            const arrHolder = test.split('_');

            const results = arrHolder.filter((el) => el != '');

            console.log(results);

            store.dispatch(setBooksActive(results));

            socket.emit('userChangesActiveBooks', results, userId);

            setTest('');

            setBooksActiveDisplay(store.getState().booksActive);

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


    return (

        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        
            <View style={{height: '100%', width: '100%', backgroundColor: 'black'}}>

                <TouchableOpacity style={{marginTop: '6%', alignSelf: 'center'}}
                    onPress={() => navigate()}
                >
                    <Icon name="home" color={'white'} size={28} />
                </TouchableOpacity>

                <Text style={{fontSize: 28, color: 'white', fontFamily: 'Baskerville-Bold', alignSelf: 'center', marginTop: '7.5%', marginBottom: '5%'}}>Books Active</Text>

                <View style={{borderWidth: 1, borderColor: initEditBooks ? 'lightcoral' : 'white', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center', borderRadius: 5}}>

                    <TouchableOpacity style={{borderColor: 'white', borderRightWidth: 1, borderBottomWidth: 1, borderTopRightRadius: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 1, position: 'absolute', left: '0%', top: '0%'}}
                        onPress={() => toggleEditBooks()}
                    >
                        <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville', padding: 8}}>{!initEditBooks ? 'Edit' : 'Save'}</Text>
                    </TouchableOpacity>

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

                <Text style={{fontSize: 28, color: 'white', fontFamily: 'Baskerville-Bold', alignSelf: 'center', marginTop: '7.5%', marginBottom: '5%'}}>Channels Active</Text>

                <View style={{borderWidth: 1, borderColor: initEditBooks ? 'lightcoral' : 'white', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center', borderRadius: 5}}>

                    <TouchableOpacity style={{borderColor: 'white', borderRightWidth: 1, borderBottomWidth: 1, borderTopRightRadius: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 1, position: 'absolute', left: '0%', top: '0%'}}
                        // onPress={() => toggleEditBooks()}
                    >
                        <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville', padding: 8}}>{!initEditBooks ? 'Edit' : 'Save'}</Text>
                    </TouchableOpacity>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5}} disabled={!initEditBooks}
                            // onPress={() => pressBookActive('all')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, paddingLeft: 17, paddingRight: 17, fontFamily: 'Baskerville'}}>All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%'}} disabled={!initEditBooks}
                            // onPress={() => pressBookActive('FanDuel')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>NCAA Basketball</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%'}} disabled={!initEditBooks}
                            // onPress={() => pressBookActive('FanDuel')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>NBA Basketball</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%'}} disabled={!initEditBooks}
                            // onPress={() => pressBookActive('FanDuel')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>MLB Baseball</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%'}} disabled={!initEditBooks}
                            // onPress={() => pressBookActive('FanDuel')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>NFL Football</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '3%'}}>
                        <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', borderRadius: 5, marginLeft: '2.5%', width: '40%'}} disabled={!initEditBooks}
                            // onPress={() => pressBookActive('FanDuel')}
                        >
                            <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7,  fontFamily: 'Baskerville', textAlign: 'center'}}>European Football</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )

}