import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useRouter } from 'expo-router'

export function FeedComponent({data}) {

    const router = useRouter();

    const elementsArr = [];

    for (let i = data.length - 1; i >= 0; i--) {

        elementsArr.push(
            <View key={i} style={{width: '98%',  alignSelf: 'center', borderStyle: 'solid', borderColor: 'white', borderTopWidth: 2, borderBottomWidth: 2, marginTop: 10, padding: 20, marginBottom: '5%'}}>
                <Text style={{color: 'white', textAlign: 'center', marginBottom: '2%', fontFamily: 'Baskerville', display: data[i].payload.team1 ? 'flex' : 'none'}}><Text style={{color: 'skyblue', fontWeight: 600}}>{data[i].payload.team1}</Text> has shifted <Text style={{color: 'lightcoral', fontWeight: 600}}>{data[i].payload.team1OddsChange}</Text> {"\n"} (started at <Text style={{color: 'lightcoral', fontWeight: 600}}>{data[i].payload.team1OriginalOdds}</Text> & now at <Text style={{color: 'lightcoral', fontWeight: 600}}>{data[i].payload.team1UpdatedOdds}</Text>)</Text>
                <Text style={{color: 'white', textAlign: 'center', marginBottom: '2%', fontFamily: 'Baskerville', display: data[i].payload.team2 ? 'flex' : 'none'}}><Text style={{color: 'skyblue', fontWeight: 600}}>{data[i].payload.team2}</Text> has shifted <Text style={{color: 'lightcoral', fontWeight: 600}}>{data[i].payload.team2OddsChange}</Text> {"\n"} (started at <Text style={{color: 'lightcoral', fontWeight: 600}}>{data[i].payload.team2OriginalOdds}</Text> & now at <Text style={{color: 'lightcoral', fontWeight: 600}}>{data[i].payload.team2UpdatedOdds}</Text>)</Text>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'Baskerville'}}>Location: <Text style={{color: 'skyblue', textDecorationLine: 'underline', fontWeight: 600}}>{data[i].payload.location}</Text></Text>
                <Text style={{color: '#BDABAB', textAlign: 'center', fontFamily: 'Baskerville', marginTop: '5%'}}>{returnHowLongAgo(data[i].payload.committedStamp) >= 1 ? `${returnHowLongAgo(data[i].payload.committedStamp)} min ago` : 'New!'}</Text>
                <TouchableOpacity style={{alignSelf: 'center', backgroundColor: 'green', marginTop: '5%'}} 
                    onPress={() => {
                        router.push({
                            pathname: data[i].payload.link
                        })
                    }}
                >
                    <Text style={{color: 'white', paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, fontFamily: 'Baskerville'}}>GO</Text>
                </TouchableOpacity>
            </View> 
        )

    }

    function returnHowLongAgo(committedStamp) {

        const now = new Date();
        const past = new Date(committedStamp);
        const diffInMs = now - past;
        const diffInMinutes = Math.floor(diffInMs / 60000); // 60000 ms in a minute
        return diffInMinutes;

    }

    return (

        <ScrollView style={{position: 'absolute', height: '80%', width: '98%', alignSelf: 'center', top: '17.5%', borderColor: 'white', borderTopWidth: 1, borderBottomWidth: 1}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} scrollsToTop={false} showsVerticalScrollIndicator={false}>
            <Text style={{fontSize: 18, textAlign: 'center', alignSelf: 'center', fontFamily: 'Baskerville', color: 'white', marginTop: '5%'}}>Latest Updates</Text>
            
            { elementsArr }

        </ScrollView>

    )

}