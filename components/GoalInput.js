import React, {useState} from 'react';
import { Text,StyleSheet,TouchableOpacity, TextInput, View, KeyboardAvoidingView} from "react-native";

const GoalInput = props =>  {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput value={enteredGoal} onChangeText={goalInputHandler} style={styles.textInput} placeholder="Course Goal" placeholderTextColor = "#fff"/>
            <View style={{flexDirection:'row' ,width: '60%', alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={(props.addGoalHandler.bind(this, enteredGoal))}><Text style={{color: 'white'}}>Add</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    textInput: {
        marginBottom: 10,
        color: 'white',
        borderColor: 'black',
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 14,
        backgroundColor: '#5ce0c2',
        padding: 10
    },
    button: {
        color: 'white',
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 14,
        backgroundColor: '#00d29c',
        padding: 10,
        marginTop: 15,
        alignItems: 'center'
    }
})

export default GoalInput