import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import getRealm from '../RealmDB/realm'

import Animacao from 'lottie-react-native'

import ListName from '../components/ListName'

import { getStatusBarHeight } from 'react-native-status-bar-height'
const distancia = 30 + getStatusBarHeight(true)

export default function Login({ navigation }) {

  const [lista, setLista] = useState([]);

  useEffect(() => {

    async function getList() {

      const realm = await getRealm()

      const data = realm.objects('Listas')
      
      setLista(data)

      console.log(lista)

    }getList()
      
  }, [])

  return (

    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#006992', '#0087BC']} style={styles.linearGradient}>
        <Text style={styles.title} >Listas</Text>

          <View style={styles.form}>
          <Text style={styles.title2}>Crie uma lista</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('List')}} style={styles.button}>
            <Icon name="plus" size={18} color="#FFF"/>
          </TouchableOpacity>
        </View>

        <FlatList style={styles.list}
        data = {lista}
        keyExtractor={ item => item.id }
        contentContainerStyle={{paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={ ( { item } ) => (

          <ListName data={item} />

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
  title: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    paddingHorizontal: 20

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