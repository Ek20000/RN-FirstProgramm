import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Animated} from "react-native";
import LottieView from "lottie-react-native";

const GoalItemDelete = props => {
    const [fadeAnim] = useState(new Animated.Value((1)));
    const [shadowAnim] = useState(new Animated.Value((1)));
    const animate = useRef();

    const playAnimation = () => {
        animation.current.play();
    }

    const _animateItem = (appear = true, delay = 300, callback) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {toValue: appear ? 2 : 0,duration: delay})
        ]).start(callback)

    };

    const _reset = (callback) => {
        _animateItem(true,0,callback)
    }

    const _delete = () => {
        _animateItem(false, 200 , () => _reset(props.removeGoalHandler.bind(this,props.id)));
    }

    useEffect(() => {
        _animateItem();
    }, [])

    return (
        <Animated.View style={{opacity: fadeAnim}}>
        <TouchableOpacity onPress={() => animate.current.play()} style={styles.swipeDelete}>
            <LottieView ref={animate} loop={false} onAnimationFinish={_delete} source={require('../assets/delete.json')} style={{
                width: 40,
                height: 40,
                left: -5.5,
                top: -6.8}}/>
        </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    swipeDelete: {
        flexDirection: 'row',
        borderWidth: 0.1,
        color: 'white',
        height: 60,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: '80%',
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowRadius: 0.2,
        shadowOpacity: 0.25,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        padding: 24.5,
        marginTop: 15
    }

})

export default GoalItemDelete;