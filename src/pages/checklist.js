import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import getRealm from '../RealmDB/realm'

import { getStatusBarHeight } from 'react-native-status-bar-height'
const distancia = 24 + getStatusBarHeight(true)


export default function checklist( { navigation } ) {

    const id = navigation.getParam('id')

    const [lista, setLista] = useState([]);

    useEffect(() => {

    async function getList() {

        const realm = await getRealm()

        const data = realm.objects('Listas').filtered(`id = "${id}"`);
        
        setLista(data)
       

    }getList()
        
    }, [])

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>  
        <FlatList 
        data = {lista}
        keyExtractor={ item => item.id }
        contentContainerStyle={{paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={ ( { item } ) => (
            <View>
                <Text  > {item.name} </Text>
                <Text  > {item.contents} </Text>
            </View>

        )}
        
        />
    </KeyboardAvoidingView>  
  );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:  'center',
      paddingTop: distancia,
      backgroundColor: '#EEE',
    },
  });
