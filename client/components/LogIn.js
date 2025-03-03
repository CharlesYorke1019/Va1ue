import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import socket from "../models/socket";
import { useNavigation } from '@react-navigation/native'
import { store, setUserInfoSuccessfulLogIn } from "../models/store";

export function LogIn({position, setPosition})   {

    const [error, setError] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let suUsernameHolder;
    let suPasswordHolder;

    const navigation = useNavigation();

    function userLogsIn() {
        socket.emit('logIn', {email: username, password: password})
    }

    socket.off('logInFail').on('logInFail', () => {

        setError(true);

        setTimeout(() => {
            setError(false);
        }, 5000);

    })

    socket.off('logInSuccessful').on('logInSuccessful', (userData) => { 
        setUsername('');
        setPassword('');

        store.dispatch(setUserInfoSuccessfulLogIn(userData));
        navigation.navigate('Home');
    })

    return (

        <View 
            style={{backgroundColor: 'black', position: 'absolute', alignSelf: 'center', top: '40%', width: '80%', display: position === 0 ? 'flex' : 'none'}}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <View style={{display: error ? 'flex' : 'none', position: 'absolute', alignSelf: 'center', top: '-30%'}}>
                <Text style={{color: 'white', fontFamily: 'Baskerville', textAlign: 'center'}}>An error has occured while logging in. Please try again</Text>
            </View>
            
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15}}>

                <View style={{borderWidth: 1, borderColor: 'white', marginRight: '3%', borderRadius: 5}}>
                    <Icon name="user" color={'white'} size={28} style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10}} />
                </View>

                <TextInput 
                    value={suUsernameHolder}
                    onChangeText={(input) => setUsername(input)}
                    style={{width: 200, height: 40, borderWidth: 1, backgroundColor: 'white', alignSelf: 'center', textAlign: 'center', fontFamily: 'Baskerville', borderRadius: 5}}
                    placeholder='Email'
                    placeholderTextColor={'grey'}
                    spellCheck={false}
                    autoCorrect={false}
                />

            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>

                <View style={{borderWidth: 1, borderColor: 'white', marginRight: '3%', borderRadius: 5}}>
                    <Icon name="lock" color={'white'} size={28} style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10}} />
                </View>
                <TextInput 
                    value={suPasswordHolder}
                    onChangeText={(input) => setPassword(input)}
                    style={{width: 200, height: 40, borderWidth: 1, backgroundColor: 'white', alignSelf: 'center', textAlign: 'center', fontFamily: 'Baskerville', borderRadius: 5}}
                    placeholder='Password'
                    placeholderTextColor={'grey'}
                    secureTextEntry={true}
                    spellCheck={false}
                    autoCorrect={false}
                    autoCapitalize='none'
                />

            </View>

            <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', position: 'absolute', alignSelf: 'center', top: '250%', borderRadius: 5}}
                onPress={() => userLogsIn()}
            >
                <Text style={{color: 'white', paddingTop: 7, paddingBottom: 7, paddingLeft: 17, paddingRight: 17, fontFamily: 'Baskerville'}}>Continue</Text>
            </TouchableOpacity>


        </View>

    )

}