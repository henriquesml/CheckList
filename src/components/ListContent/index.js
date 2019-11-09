import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function ListContent( {item, navigation} ) {

    const [color, setColor] = useState('#FFF')

    function check(){
        if (color == '#FFF' ) {
            setColor('#36D800')
        }
        else {
            setColor('#FFF')
        }

    }

    return (
        <View  style={{
       
            padding: 15,
            borderRadius: 4,
            backgroundColor: color,
            marginBottom: 15
            
        }}>
            <View style={styles.form}>
         
                <Text style={styles.name} >{item}</Text>
                <TouchableOpacity onPress={check} >
                    <Icon name="check" size={35} color="#000"/>
                </TouchableOpacity>
               
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
       
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