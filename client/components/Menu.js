import { Animated, View, TouchableOpacity, Text } from "react-native"
import { useState } from "react"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'


export function Menu({display, setMenuDisplay, toggleMenuFunc, leftValue}) {


    const navigation = useNavigation();

    function navigate(screen) {

        // toggleMenuFunc();
        navigation.navigate(screen);

    }

    return (
        <Animated.View style={{marginLeft: leftValue, display: display ? 'flex' : 'none', borderWidth: 1, borderRadius: 5, borderColor: '#171A1B', width: '60%', height: '100%', left: '-80%', top: '0%', position: 'absolute', zIndex: 1000, backgroundColor: 'black'}}>

            <TouchableOpacity style={{alignSelf: 'center', marginTop: '10%', marginBottom: '5%', width: '100%', borderBottomWidth: 1, borderBottomColor: '#171A1B'}}
                onPress={() => toggleMenuFunc()}
            >
                <Icon2 name="menufold" color={'white'} size={20} style={{alignSelf: 'center', marginBottom: '10%'}}  />
            </TouchableOpacity>        

            <TouchableOpacity style={{width: '95%', height: '5%', alignSelf: 'center', marginTop: '20%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#171A1B', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigate('Account')}
            >

                <Icon name="user" color={'white'} size={14} style={{marginRight: '5%'}} />
                <Text style={{color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'Baskerville'}}>Account</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{width: '90%', height: '5%', alignSelf: 'center', marginTop: '20%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#171A1B', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigate('Customize')}
            >

                <Icon3 name="settings" color={'white'} size={14} style={{marginRight: '5%'}} />
                <Text style={{color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'Baskerville'}}>Customize</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{width: '90%', height: '5%', alignSelf: 'center', marginTop: '20%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#171A1B', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigate('Customize')}
            >

                <Icon4 name="package" color={'white'} size={14} style={{marginRight: '5%'}} />
                <Text style={{color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'Baskerville'}}>Subscriptions</Text>

            </TouchableOpacity>


        </Animated.View>
    )

}