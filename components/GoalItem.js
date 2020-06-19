import React, {useRef, useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableWithoutFeedback, Animated} from "react-native";
import LottieView from "lottie-react-native";

const GoalItem = props => {

    const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 0
    const animation = useRef();

    const playAnimation = () => {
        animation.current.play();
    }

    const _animateItem = (appear = true, delay = 300, callback) => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: appear ? 1 : 0,
                    duration: delay,
                }
            ).start(callback);
    };

    const _reset = (callback) => {
        _animateItem(true,0,callback)
    }

    const _delete = () => {
        _animateItem(false, 200 , () => _reset(props.onDelete));
    }

    useEffect(() => {
        _animateItem();
    }, [])


    return (
        <Animated.View style={{opacity: fadeAnim}}>
        <TouchableWithoutFeedback opacity={0} onPress={() => _delete()}>
            <View style={styles.listItem}>
                <Text style={styles.text}>{props.title}</Text>
                <TouchableWithoutFeedback onPress={playAnimation}>
                <LottieView ref={animation} speed={1} loop={false} style={{height: 60, width: 60,}} source={require('../assets/checkbox.json')}/>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        flexDirection:'row',
        color: 'white',
        width: '80%',
        alignSelf: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        elevation: 0,
        borderRadius: 14,
        backgroundColor: '#00d29c',
        marginTop: 15,
        marginBottom: 2,

    },
    text: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 5
    }
})

export default GoalItem