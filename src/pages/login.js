import React, { useState, useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Animacao from 'lottie-react-native'
import checklist from './checklist.json'

export default function Login({ navigation }) {
  const [name, setName] = useState('');

  async function handleSubmit() {
    console.log(name)
    navigation.navigate('Main')
      
  };

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
    
      <StatusBar backgroundColor="#DD0426" barStyle="light-content" />

      <Animacao style={{width: 250, height: 250}} resizeMode='contain' autoSize source={checklist} autoPlay loop/>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput 
          style={styles.Input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          autoCapitalize='words'
          autoCorrect={false}
          value={name}
          onChangeText={setName}
          
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.Entrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>


      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form:{
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
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
    height: 42,
    backgroundColor: '#DD0426',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: 15
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});