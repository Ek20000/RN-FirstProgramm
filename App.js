import React, {useState, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import RBSheet from "react-native-raw-bottom-sheet";
import {SwipeListView} from 'react-native-swipe-list-view';
import GoalItemDelete from "./components/GoalItemDelete";

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 0
    const rbSheet = useRef();

    const addGoalHandler = (enteredGoal) => {
        if(enteredGoal === '') {
            alert("Entered Goal - empty")
        } else {
            setCourseGoals(currentGoals => [...currentGoals, {key: Math.random().toString(), value: enteredGoal}]);
            rbSheet.current.close();
        }

    }

    const removeGoalHandler = id => {
        setCourseGoals(currentGoals => currentGoals.filter(goal => goal.key !== id));
    }


    return (
        <View style={styles.screen}>
            <View style={[styles.shadow, {height: 130, backgroundColor: '#fff'}]}>
                <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => rbSheet.current.open()}><Text
                    style={{color: 'white'}}>Add new Goal</Text></TouchableOpacity>
            </View>
            <RBSheet customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                container: {
                    backgroundColor: '#1b8192',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                },
                draggableIcon: {
                    backgroundColor: "#fff"
                }
            }} closeOnDragDown={true} dragFromTopOnly={true} ref={rbSheet}>
                <GoalInput visible={true} addGoalHandler={(enteredGoal) => addGoalHandler(enteredGoal)}/>
            </RBSheet>
            <SwipeListView data={courseGoals}
                           uid={entry => entry.id}
                           renderItem={itemData => <Animated.View style={{opacity: fadeAnim}}><GoalItem
                               onDelete={removeGoalHandler.bind(this, itemData.item.key)}
                               title={itemData.item.value}/></Animated.View>}
                           renderHiddenItem={(itemData) => <Animated.View style={{opacity: fadeAnim}}><GoalItemDelete
                               removeGoalHandler={removeGoalHandler.bind(this, itemData.item.key)}/></Animated.View>}
                           rightOpenValue={-75}
                           disableRightSwipe={true}
                           style={{height: 400}} fadingEdgeLength={400} bounces={false}
                           showsVerticalScrollIndicator={false}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {},
    button: {
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#5ce0c2',
        padding: 10,
        marginTop: 70,
        marginHorizontal: 30
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 14,
    },
});


