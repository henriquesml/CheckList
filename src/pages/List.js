import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import getRealm from '../RealmDB/realm'

import { getStatusBarHeight } from 'react-native-status-bar-height'
const distancia = 24 + getStatusBarHeight(true)

export default function Login({ navigation }) {
  const [task, setTask] = useState('');
  const [List, setList] = useState('');
  const [AllTask, setAllTask] = useState([]);
  const [aparecerBotao, setaparecerBotao] = useState(false);
  const [color, setcolor] = useState('#006992');

  useEffect(() => {

    if (AllTask.length > 0) {

      setaparecerBotao(true)

    } else {

      setaparecerBotao(false)
    }
      
  }, [AllTask])

  function Additem(){
      if (task.length > 0) {
    setAllTask([...AllTask, { id: String(Date.now()), name: task}]);
    console.log(AllTask)
    setTask('');
  }

    Keyboard.dismiss()
  };

	Deletitem = id => {
      
		setAllTask(
			AllTask.filter(AllTask => {
				if (AllTask.id !== id) return true;
			})
        );
  };

  async function SaveList() {
    const data = {
      id: String(Date.now()),
      name: List,
      contents:  JSON.stringify(AllTask)
    }

    const realm = await getRealm()

    realm.write(() => {
      realm.create('Listas', data)
    })

  }

  async function Submit() {

    if (List != '') {

      await SaveList()
      navigation.navigate('Main')

    } else {
      setcolor('#DD0426')
    }


  };

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>  
        <StatusBar backgroundColor="#0087BC" barStyle="light-content" />
            <View style={styles.Head}>

                <TouchableOpacity onPress={() => {navigation.navigate('Main')}}>
                    <Icon name="chevron-left" size={20} color="#FFF" />
                </TouchableOpacity>
              
                <View style={{    alignContent: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 1,
                                  borderColor: color,
                                  backgroundColor: '#006992',
                                  height: 40,
                                  borderRadius: 2,
                                  width: '70%'}} >
                  <TextInput 
                      style={styles.TexteHead}                    
                      onChangeText={setList}
                      value={List}
                      placeholder="Nome da sua lista"
                      placeholderTextColor="#FFF"
                      returnKeyType="done"
                      returnKeyLabel="done"
                  />
                </View>
                
                {aparecerBotao? <TouchableOpacity onPress={Submit}>
                                  <Icon name="check" size={25} color="#36D800" />
                                </TouchableOpacity> 
                                
                                : <Icon name="check" size={25} color="#999" />}

            </View>

            <FlatList
            data={AllTask}
           
            // Manda a lista pra baixo (PROVISORIO)
            ref={ref => scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                scrollView.scrollToEnd({animated: true});
            }}

            renderItem={({ item }) =>
            <View style={styles.Tasks}> 
                <Text style={styles.Item}>
                  {item.name}
                </Text>
                <TouchableOpacity onPress={() => Deletitem(item.id)} >
                    <Icon name="trash" size={20} color="#DD0426" />
                </TouchableOpacity>
            </View>}
            />

          <View style={styles.AddTask}>
          <TextInput
              style={styles.textInput}
              onChangeText={setTask}
              onSubmitEditing={Additem}
              value={task}
              placeholder="Adicione um item"
              placeholderTextColor="#999"
              returnKeyType="done"
              returnKeyLabel="done"
          />
          <TouchableOpacity onPress={Additem}>
              <Icon name="plus" size={20} color="#999" />
          </TouchableOpacity>
          </View>

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
  Head: {
    backgroundColor: '#0087BC',
    height: '10%',
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,

  },
  boxhead: {

  },
  TexteHead: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: 'bold',
    alignSelf: 'center'

  },
  AddTask: {  
    alignItems: 'center', 
    flexDirection: "row",
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    height: 50,
    borderWidth: 2,
    borderColor: '#DDD',
    
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#9F9F9F',
    width:"98%",
    
  },
  Tasks: {  
    height: 55,
    backgroundColor: '#DDD',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  Item : {
    fontSize: 16,
    color: '#373737',
    width:"95%",
    fontWeight: 'bold',

  },
});