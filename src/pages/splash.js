import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Text, StyleSheet } from 'react-native';
import Animacao from 'lottie-react-native'
import checklist from './checklist.json'

export default function Login({ navigation }) {


  async function handleSubmit() {
    navigation.navigate('Main')
      
  };

  setTimeout(handleSubmit, 2500)

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>

      <Animacao style={{width: 250, height: 250}} resizeMode='contain' autoSize source={checklist} autoPlay loop/>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});