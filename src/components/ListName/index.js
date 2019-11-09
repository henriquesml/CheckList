import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'

function List( {data, navigation} ) {

function handleNavigation(id) {
    navigation.navigate('CheckList', { id })
    
}

  return (
    <TouchableHighlight underlayColor='white' style={styles.Container} onPress={() => handleNavigation(data.id)} >

        <View style={styles.form}>
            
           
                <Text style={styles.name} > {data.name} </Text>
         
        </View>
    </TouchableHighlight>
  );
}


const styles = StyleSheet.create({
    Container: {
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginBottom: 15,
        paddingVertical: 26
    },
    form: {
        flexDirection: 'row',
        marginTop: 10,
       
    },
    name : {
        flex: 1, 
        fontSize: 18,
        lineHeight: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

});

export default withNavigation(List)