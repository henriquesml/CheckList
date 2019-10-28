import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, StatusBar, KeyboardAvoidingView, Platform, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Animacao from 'lottie-react-native'
import vazio from './vazio.json'

export default function Login({ navigation }) {

  const [lista, setLista] = useState([]);

  const [aparecerBotao, setaparecerBotao] = useState(false);

  useEffect(() => {

    async function getList() {
      var list = await AsyncStorage.getItem('Listas')
      setLista( JSON.parse(list))

    }getList()

    if (lista != null) {

      setaparecerBotao(false)

    } else {
      setaparecerBotao(true)
    }
      
  }, [lista])

  async function handleSignout() {
    await AsyncStorage.removeItem('Listas') }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <StatusBar backgroundColor="#DD0426" barStyle="light-content" />

   
        {lista != null ?  
                            <>
                            <FlatList                  
                              data={lista}
                              keyExtractor={list => list.key}
                              renderItem={( {item} ) => (
                                <View style={styles.box}> 
                                  <Text style={styles.boxText}>{item.name}</Text>
                                <TouchableOpacity >
                                  <Icon name="check-square" size={30} color="#000" style={{alignSelf: 'center'}} />
                                </TouchableOpacity>
                                </View>
                                
                              )}
                            /> 

                            <TouchableOpacity onPress={handleSignout}>
                                  <Text >Deletar</Text>
                            </TouchableOpacity>

                            </>
                          : <View/>}


        {aparecerBotao?   
                            <>
                            <Animacao resizeMode='contain' autoSize source={vazio} autoPlay loop/>
                            
                            <View style={styles.Entrar} >
                              <TouchableOpacity onPress={() => navigation.navigate('List')} >
                                <Text style={styles.buttonText}>Cadastrar lista</Text>
                              </TouchableOpacity>
                            </View>
                            </>
                           : <View/>}


        {aparecerBotao == false?  <TouchableOpacity onPress={() => navigation.navigate('List')} style={styles.confirmar}>
                                    <Icon name="plus" size={18} color="#FFF" style={{alignSelf: 'center'}} />
                                  </TouchableOpacity> : <View/>}

      
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    alignItems: 'center', 
    flexDirection: "row",
    height: 100,
    backgroundColor: '#E9e9e9',
    paddingHorizontal: 20,
  },
  boxText: {
    fontSize: 25,
    color: '#000',
    width: '95%'
   
  },
  check: {

  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
  },
  Input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  Entrar: {
    height: 40,
    width: '65%',
    backgroundColor: '#DD0426',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  confirmar: {
    position: "absolute",
    top: '90%',
    left: '85%',
    width: 50, 
    height: 50, 
    backgroundColor: '#DD0426',  
    justifyContent: 'center', 
    borderRadius: 30,

  },
  TextConfirmar : {
    alignSelf: 'center', 
    
  }
});