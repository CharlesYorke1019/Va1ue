import { View, SafeAreaView, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { LogIn } from '../components/LogIn';
import { Register } from '../components/Register';

export function Index({}) {

    const [startScreenPosition, setStartScreenPosition] = useState(0);

    function changePosition(position) {
        setStartScreenPosition(position);
    }

    return (
        <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'black', zIndex: -5, flex: 1}}
        >
    
          <View style={{flex: 1, backgroundColor: 'black'}}
          >
            <Text style={{color: 'white', fontSize: 56, alignSelf: 'center', fontFamily: 'Baskerville-Bold', marginTop: '20%'}}>
              Value
            </Text>
    
            <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', position: 'absolute', top: '30%', left: '22.5%', width: '25%', opacity: startScreenPosition === 0 ? 1 : 0.5, borderRadius: 5}}
              onPress={() => changePosition(0)}
            >
              <Text style={{color: 'white', fontFamily: 'Baskerville', fontSize: 18, textAlign: 'center', paddingTop: 7, paddingBottom: 7}}>Log In</Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={{borderWidth: 1, borderColor: 'white', position: 'absolute', top: '30%', left: '52.5%', width: '25%', opacity: startScreenPosition === 1 ? 1 : 0.5, borderRadius: 5}}
              onPress={() => changePosition(1)}
            >
              <Text style={{color: 'white', fontFamily: 'Baskerville', fontSize: 18, textAlign: 'center', paddingTop: 7, paddingBottom: 7}}>Register</Text>
            </TouchableOpacity>
    
            <KeyboardAvoidingView style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <LogIn position={startScreenPosition} setPosition={setStartScreenPosition} />
              <Register position={startScreenPosition} setPosition={setStartScreenPosition} />
            </KeyboardAvoidingView>
    
          </View>
    
        </SafeAreaView>
      );

}