import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function ListContent( {item, navigation} ) {

    return (
        <TouchableOpacity style={styles.Container}>
            <View style={styles.form}>
         
                <Text style={styles.name} >{item}</Text>
               
            </View>
        </TouchableOpacity>

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

export default withNavigation(ListContent);