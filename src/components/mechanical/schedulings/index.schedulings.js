import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { PersonContext } from '../../../contexts/person.context';
import { SchedulingContext } from '../../../contexts/scheduling.context';
import { MechanicalContext } from '../../../contexts/mechanical.context';

function RenderSchedulings({data}){
    const { concludeScheduling } = useContext(SchedulingContext);
    const {getMechanicalChats} = useContext(MechanicalContext);

    const [dateScheduling, setDateScheduling] = useState(null);

    useEffect(() => {
        let newDate = data.dateScheduling.split('T');
        let newTime = newDate[1];
        newDate = newDate[0];
        newDate = newDate.split('-');
        newDate = newDate[2] + '/' + newDate[1];
        newTime = newTime.split(':');
        newTime = newTime[0] + ':' + newTime[1];
        setDateScheduling(newDate + ' - ' + newTime);
    }, [])

    async function handleConcludeScheduling() {
        await concludeScheduling(data.id_scheduling, data.client.clientId);
        getMechanicalChats();
    }

    return(
        <View style={{borderRadius: 6, borderWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.3)', height: 70, justifyContent: 'center', marginTop: 10}}>
            <View style={{marginLeft: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', marginTop: 15}}>
                        <Text style={{fontFamily: 'DMSans_400Regular', fontSize: 15}}>Cliente: {data.client.nameClient}</Text>
                        <Text style={{fontFamily: 'DMSans_400Regular', fontSize: 15}}>Data: {dateScheduling}</Text>
                    </View>
                    <TouchableOpacity onPress={handleConcludeScheduling} style={{backgroundColor: "#1E22AA", height: 70, width: 74, alignItems: "center", justifyContent: 'center', borderRadius: 6}}>
                        <AntDesign name="check" size={30} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

function Schedulings(schedulings) {
    const { person } = useContext(PersonContext);
    const { getMechanicalSchedulings } = useContext(SchedulingContext);

    const [todaySchedulings, setTodaySchedulings] = useState([]);
    const [tomorrowSchedulings, setTomorrowSchedulings] = useState([]);
    const [thisWeekSchedulings, setThisWeekSchedulings] = useState([]);
    const [thisMonthSchedulings, setThisMonthSchedulings] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const currentWeek = currentDay + 7;

        setTodaySchedulings([]);
        setTomorrowSchedulings([]);
        setThisWeekSchedulings([]);
        setThisMonthSchedulings([]);

        schedulings.schedulings.forEach(e => {
            let dateScheduling = e.dateScheduling.split('-');
            let yearScheduling = dateScheduling[0];
            let monthScheduling = dateScheduling[1];
            let dayScheduling = dateScheduling[2];
            dayScheduling = dayScheduling.split('T');
            dayScheduling = dayScheduling[0];
            if(yearScheduling == currentYear) {
                if(monthScheduling == currentMonth){
                    if(dayScheduling == currentDay) 
                        setTodaySchedulings(todaySchedulings => [...todaySchedulings, e]);
                    else{
                        if(dayScheduling == (currentDay + 1))
                            setTomorrowSchedulings(tomorrowSchedulings => [...tomorrowSchedulings, e]);
                        else{
                            if(dayScheduling > currentDay & dayScheduling <= currentWeek)
                                setThisWeekSchedulings(thisWeekSchedulings => [...thisWeekSchedulings, e]);
                            else
                                setThisMonthSchedulings(thisMonthSchedulings => [...thisMonthSchedulings, e]);
                        }
                    }
                }
            }
        });
    }, [schedulings])

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
          try {
              await getMechanicalSchedulings();
              setRefreshing(false);
          } catch (error) {
            return error;
          }
      }, [refreshing]);

    return(
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <View style={{width: 370, alignSelf: 'center', marginTop: 48}}>
                {
                    person ? <Text style={{color: '#1E22AA', fontSize: 20, fontWeight: 'bold', fontFamily: 'DMSans_700Bold'}}>Olá, {person.mechanicalData.nameMechanical}</Text> : 
                    <Text></Text>
                }
                <Text style={{color: '#000', fontSize: 18, fontFamily: 'DMSans_500Medium'}}>Confira seus agendamentos: </Text>
                <Text style={{marginTop: 20, fontSize: 20, fontFamily: 'DMSans_500Medium'}}>Hoje</Text>
                <FlatList
                data={todaySchedulings}
                keyExtractor={(item) => item.id_scheduling.toString()}
                renderItem={({item}) => (<RenderSchedulings data={item}/>)}
                />
                <Text style={{marginTop: 20, fontSize: 20, fontFamily: 'DMSans_500Medium'}}>Amanhã</Text>
                <FlatList
                data={tomorrowSchedulings}
                keyExtractor={(item) => item.id_scheduling.toString()}
                renderItem={({item}) => (<RenderSchedulings data={item}/>)}
                />
                <Text style={{marginTop: 20, fontSize: 20, fontFamily: 'DMSans_500Medium'}}>Esta semana</Text>
                <FlatList
                data={thisWeekSchedulings}
                keyExtractor={(item) => item.id_scheduling.toString()}
                renderItem={({item}) => (<RenderSchedulings data={item}/>)}
                />
                <Text style={{marginTop: 20, fontSize: 20, fontFamily: 'DMSans_500Medium'}}>Este mês</Text>
                <FlatList
                data={thisMonthSchedulings}
                keyExtractor={(item) => item.id_scheduling.toString()}
                renderItem={({item}) => (<RenderSchedulings data={item}/>)}
                />
            </View>
        </ScrollView>
    )
}

export default Schedulings;