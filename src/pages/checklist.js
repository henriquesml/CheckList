import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import getRealm from '../RealmDB/realm'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'

import { getStatusBarHeight } from 'react-native-status-bar-height'
const distancia = 24 + getStatusBarHeight(true)

import ListContent from '../components/ListContent'

export default function checklist( { navigation } ) {

    const id = navigation.getParam('id')

    const [lista, setLista] = useState([]);

    const [teste, setTest] = useState([]);

    const [name, setName] = useState([]);

    useEffect(() => {

    async function getList() {

        const realm = await getRealm()

        const data = realm.objects('Listas').filtered(`id = "${id}"`);
        
        setLista(data)
        setTest(data[0].contents)
        setName(data[0].name)

    }getList()
        
    }, [])

  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#006992', '#0087BC']} style={styles.linearGradient}>

      <View  style={styles.Head}>

      <TouchableOpacity style={{marginTop: distancia}} onPress={() => {navigation.navigate('Main')}}>
        <Icon name="chevron-left" size={20} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.title} >{name}</Text>

      </View>

      <FlatList style={styles.list}
      data = {lista}
      keyExtractor={ item => item.id }
      contentContainerStyle={{paddingHorizontal: 20}}
      showsHorizontalScrollIndicator={false}
      renderItem={ ( { item } ) => (
          <View>
              {teste.map(content => <ListContent key={content} item={content}/> )}
          </View>

      )}
      
      />
       
    </LinearGradient>  
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex:1,
    paddingTop: distancia
  },
  Head: {
    height: '10%',
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: distancia

  },
  title: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: distancia

  },
  form: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20

  },
  title2: {
    flex: 1, 
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    fontSize: 16,
    color: '#999',
    backgroundColor: '#FFF'
  },
  button: {
    backgroundColor: '#0090C9',
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  list : {
    marginTop: 20,

  }
});