import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';
import getRealm from '../../RealmDB/realm'
import { SwipeListView } from 'react-native-swipe-list-view'

import ListName from '../../components/ListName'

import { getStatusBarHeight } from 'react-native-status-bar-height'
const distancia = 30 + getStatusBarHeight(true)

export default function Login({ navigation }) {

  const [lista, setLista] = useState([]);
  const [reset, setReset] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {

    async function getList() {

      const realm = await getRealm()

      const data = realm.objects('Listas')
      
      setLista(data)

      setReset(false)

    }getList()
      
  }, [reset])

  async function Delete(id){

    const realm = await getRealm()

    const select = realm.objects('Listas').filtered(`id = "${id}"`);

    realm.write(() => {
     realm.delete(select)
    })
    setReset(true)
  }

  return (

    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#006992', '#0087BC']} style={styles.linearGradient}>
        <Text style={styles.title} >Listas</Text>

          <View style={styles.form}>
            <View style={styles.title2}>

              <TextInput style={styles.teste}
                          
                onChangeText={setName}
                value={name}
                placeholder="Crie uma lista"
                placeholderTextColor="#999"
                returnKeyType="done"
                returnKeyLabel="done"
              />
            </View>

            <TouchableOpacity onPress={() => {navigation.navigate('List', { name })}} style={styles.button}>
              <Icon name="plus" size={18} color="#FFF"/>
            </TouchableOpacity>
        </View>

        <SwipeListView style={styles.list}
        data = {lista}
        keyExtractor={ item => item.id }
        contentContainerStyle={{paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
        disableRightSwipe={true}
        renderItem={ ( { item } ) => (

          <ListName data={item} in a SwipeListView />

        )}
        renderHiddenItem={ (data, rowMap) => (
          <View style={styles.Itens}>
                <TouchableOpacity style={styles.excluir} onPress={() => {Delete(data['item'].id)}}>
                    <Icon name="delete" size={25} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.alterar} >
                    <Icon name="pencil" size={25} color="#FFF" />
                </TouchableOpacity>

                <Text style={styles.layout}></Text>
        
          </View>
        )}
        rightOpenValue={-112}
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
    backgroundColor: '#FFF',
    paddingVertical: 1,
  },
  teste : {
    fontSize: 16,
    color: '#999',
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

  },
  Itens: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    borderRadius: 4,
  },
  alterar: {
    backgroundColor: '#DD9904',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 28
  },
  excluir:{
    backgroundColor: '#DD0426',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 28
  },
  layout: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 150,
    paddingVertical: 31
  }
});