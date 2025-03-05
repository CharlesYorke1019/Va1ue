import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useRouter } from 'expo-router'


export function FeedComponent({data}) {

    const router = useRouter();

    const elementsArr = [];

    for (let i = data.length - 1; i >= 0; i--) {

        console.log(data[i].payload);

        elementsArr.push(
            <View key={i} style={{width: '100%',  alignSelf: 'center', borderStyle: 'solid', borderColor: 'white', borderTopWidth: 2, borderBottomWidth: 2, marginTop: 10, padding: 20, marginBottom: '5%'}}>

                <Text style={{color: 'white', fontFamily: 'Baskerville', textAlign: 'center', alignSelf: 'center', marginBottom: '2%'}}><Text style={{fontWeight: 600}}>{data[i].payload.team1}</Text> has shifted <Text style={{fontWeight: 600}}>{returnOddsWithCorrectSign(data[i].payload.team1OddsChange)}</Text> in odds</Text>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                    <View style={{backgroundColor: 'black'}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5}}>Started at</Text>
                    </View>

                    <View style={{backgroundColor: '#AEA686', marginRight: '2.5%'}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5}}>{returnOddsWithCorrectSign(data[i].payload.team1OriginalOdds)}</Text>
                    </View>

                    <View style={{backgroundColor: 'black', marginLeft: '2.5%'}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5}}>Now at</Text>
                    </View>

                    <View style={{backgroundColor: returnTrend(data[i].payload.team1OddsChange, data[i].payload.team1UpdatedOdds)}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5, color: 'white'}}>{returnOddsWithCorrectSign(data[i].payload.team1UpdatedOdds)}</Text>
                    </View>
                </View>

                <Text style={{color: 'white', fontFamily: 'Baskerville', textAlign: 'center', alignSelf: 'center', marginTop: '7.5%', marginBottom: '2%', display: data[i].payload.team2 ? 'flex' : 'none'}}><Text style={{fontWeight: 600}}>{data[i].payload.team2}</Text> has shifted <Text style={{fontWeight: 600}}>{returnOddsWithCorrectSign(data[i].payload.team2OddsChange)}</Text> in odds</Text>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                    <View style={{backgroundColor: 'black'}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5}}>Started at</Text>
                    </View>

                    <View style={{backgroundColor: '#AEA686', marginRight: '2.5%', display: data[i].payload.team2 ? 'flex' : 'none'}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5}}>{returnOddsWithCorrectSign(data[i].payload.team2OriginalOdds)}</Text>
                    </View>

                    <View style={{backgroundColor: 'black', marginLeft: '2.5%'}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5}}>Now at</Text>
                    </View>

                    <View style={{backgroundColor: returnTrend(data[i].payload.team2OddsChange, data[i].payload.team2UpdatedOdds)}}>
                        <Text style={{color: 'white', fontFamily: 'Baskerville', padding: 5, color: 'white'}}>{returnOddsWithCorrectSign(data[i].payload.team2UpdatedOdds)}</Text>
                    </View>
                </View>


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

    function returnOddsWithCorrectSign(odds) {

        let str = odds.toString();

        if (odds < 0) {

            return odds;

        } else {

            return '+' + odds;

        }

    }

    function returnTrend(original, current) {

        if (original < current) {
            return 'red'
        } else {
            return 'green'
        }

    }

    return (

        <ScrollView style={{position: 'absolute', height: '80%', width: '95%', alignSelf: 'center', top: '17.5%', borderColor: 'white', borderWidth: 1, borderRadius: 5}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} scrollsToTop={false} showsVerticalScrollIndicator={false}>
            <Text style={{fontSize: 18, textAlign: 'center', alignSelf: 'center', fontFamily: 'Baskerville', color: 'white', marginTop: '5%'}}>Latest Updates</Text>
            
            { elementsArr }

        </ScrollView>

    )

}