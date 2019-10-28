import React, { useState, useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Platform, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, AsyncStorage, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Login({ navigation }) {
    const [task, setTask] = useState('');
    const [List, setList] = useState('');
    const [AllTask, setAllTask] = useState([]);
    const [aparecerBotao, setaparecerBotao] = useState(false);

    useEffect(() => {

        if (AllTask.length > 0) {

            setaparecerBotao(true)

        } else {

            setaparecerBotao(false)
        }
        
    }, [AllTask])

    function Additem(){
        if (task.length > 0) {
			setAllTask([...AllTask, { name: task, key: String(Date.now())}]);
			setTask('');
		}

        Keyboard.dismiss()
    };

	Deletitem = id => {
      
		setAllTask(
			AllTask.filter(AllTask => {
				if (AllTask.key !== id) return true;
			})
        );
	};

    async function Submit() {

      var final = []

      if (List != '') {

        final = [{
          'name': List,
          AllTask
        }]

      } else {

        final = [{
          "name": 'Lista',
          AllTask
        }]
        
      }

      await AsyncStorage.setItem('Listas', JSON.stringify(final))
        .then( ()=>{
            Alert.alert(
                "Lista Salva",
                "Sua lista foi salva com sucesso!")
            
        } )
        .catch( ()=>{
            Alert.alert(
                "Desculpe, ocorreu um erro :(",
                "Tente novamente.")
        } )

        if (AsyncStorage.getItem('Listas') != null) {
          navigation.navigate('Main') 
        }
         
    };

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <StatusBar backgroundColor="#DD0426" barStyle="light-content" />

            <View style={styles.Head}>

                <TouchableOpacity onPress={() => {navigation.navigate('Main')}}>
                    <Icon name="arrow-left" size={20} color="#FFF" />
                </TouchableOpacity>
              
                <View style={styles.boxhead} >
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
                                  <Icon name="check-circle" size={25} color="#40D317" />
                                </TouchableOpacity> 
                                
                                : <Icon name="check-circle" size={25} color="#999999" />}

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
                <TouchableOpacity onPress={() => Deletitem(item.key)} >
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
              placeholderTextColor="#A6A6A8"
              returnKeyType="done"
              returnKeyLabel="done"
          />
          <TouchableOpacity onPress={Additem}>
              <Icon name="plus" size={20} color="#A6A6A8" />
          </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
    );
    }


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:  'center'
  },
  Head: {
    backgroundColor: '#DD0426',
    height: '10%',
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,

  },
  boxhead: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C10320',
    backgroundColor: '#C10320',
    height: 40,
    borderRadius: 2,
    width: '70%'
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
    backgroundColor: '#E9e9e9',
    paddingHorizontal: 20,
    height: 50,
    
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#9F9F9F',
    width:"98%",
    
  },
  Tasks: {  
    height: 55,
    backgroundColor: '#DAD6D6',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  Item : {
    fontSize: 16,
    color: '#373737',
    width:"95%",
    fontWeight: 'bold',

  },
});