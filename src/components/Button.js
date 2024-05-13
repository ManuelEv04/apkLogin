import React, { useEffect, useRef, useState } from 'react'
import {Animated, View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native'


export default ({handlePress = () => {}, buttonContainer, title, titleStyle, IconLeft, IconRight}) => {
    
    const [toggle, setToggle] = useState(false)

    const animatedValues = {
        scalling: useRef(new Animated.Value(0)).current
    }

    const {scalling} = animatedValues

    const handleAnimated = () => {
        Animated.spring(scalling, {
            toValue: !toggle ? 0 : 50,
            friction: 10,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        handleAnimated()
    }, [toggle])

    return(
        <TouchableWithoutFeedback 
            onPress={() => handlePress}
            onPressIn={() => setToggle(true)} 
            onPressOut={() => setToggle(false)}
        >
            <Animated.View style={[buttonContainer, {overflow: 'hidden', transform: [{
                scale: scalling.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0.94]
                })
            }]}]}>
                <View style={styles.button}>
                    {IconLeft ? IconLeft : undefined}
                    <Text style={titleStyle}>{title}</Text>
                    {IconRight ? IconRight : undefined}
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 100
    },
    shadowButton: {
        backgroundColor: '#1E434C',
        width: 50,
        height: 50,
        position: 'absolute',
        borderRadius: 250,
        zIndex: 0
    }
})