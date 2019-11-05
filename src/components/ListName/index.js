import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function List( {data, navigation} ) {

function handleNavigation(id) {
    navigation.navigate('CheckList', { id })
    
}

  return (
    <View style={styles.Container}>

        <View style={styles.form}>
            <Text style={styles.name} > {data.name} </Text>
            <TouchableOpacity style={styles.button} onPress={() => handleNavigation(data.id)} >
                <Icon name="format-list-checks" size={35} color="#36D800"/>
            </TouchableOpacity>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    Container: {
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginBottom: 15
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
    },
    button : {
        justifyContent: 'center',
        paddingBottom: 4
    }
});

export default withNavigation(List)