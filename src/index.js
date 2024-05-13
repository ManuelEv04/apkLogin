import {StyleSheet, SafeAreaView, View, Text, Image, Animated} from "react-native"
import {Button, Input} from "./components"
import {useEffect, useRef} from "react"
import {useKeyboard, useOrientation} from "./hooks"
import {useSelector} from "react-redux"
import {selectKeyboard, selectOrientation} from "./slices/appSlice"

export default () => {

    useOrientation()
    useKeyboard()
    
    const translate = useRef(new Animated.Value(0)).current
    const keyboard = useSelector(selectKeyboard)
    const orientation = useSelector(selectOrientation)
    const passwordRef = useRef()    

    useEffect(() => {
        handleTranslate()
    }, [keyboard])

    const handleTranslate = () => {
        Animated.timing(translate, {
            toValue: keyboard ? 1 : 0,
            duration: 250,
            useNativeDriver: false
        }).start()
    }

    const translateStyles = {
        transform: [
            {
                translateY: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    return(
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#F32B2F'}}/>
            <Animated.View style={[styles.container, translateStyles]}>
                {
                    orientation === 'PORTRAIT'
                    ?
                        <>
                            <View style={[styles.fotoPerfil, {width: 800, left: orientation === 'PORTRAIT' ? 0 : -150, borderRadius: 1000}]}>
                                <View style={{position: 'absolute', bottom: 20, width: 120, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image
                                        source={require('./src/img/usuarios.png')}
                                        style={{height: 130, width: 130, borderRadius: 100}}
                                        resizeMode='cover'
                                    />
                                </View>
                            </View> 
                            <View style={{flex: 1}}/>
                            <View style={styles.content}>
                                <Text style={styles.title}>Welcome!</Text>
                                <Text style={styles.subtitle}>Sign in to continue</Text>
                                <Input
                                    icon={'account-outline'}
                                    placeholder={'Email'}
                                    autoCapitalize='none'
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                />
                                <Input
                                    ref={passwordRef}
                                    icon={'lock-outline'}
                                    top={17}
                                    placeholder={'**********'}
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                />
            
                                <View style={styles.passwordContainer}>
                                    <Text style={styles.forgot}>Forgot password?</Text>
                                </View>
            
                                <Button 
                                    buttonContainer={{height: 55, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F32B2F'}}
                                    title={'SIGN IN'}
                                    titleStyle={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}
                                />
                            </View>
                            <View style={{flex: 1}}/>
                        </>
                    :
                        <>
                            <View style={[styles.fotoPerfil, {left: -180, top: -180, width: 350, height: 350, borderRadius: 500}]}>
                                <View style={{position: 'absolute', bottom: 20, right: 15, width: 170, height: 170, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image
                                        source={require('./src/img/usuarios.png')}
                                        style={{height: 110, width: 110, borderRadius: 100}}
                                        resizeMode='cover'
                                    />
                                </View>
                            </View>
                            <View style={styles.fill}/>
                            <View style={[styles.content, {marginHorizontal: '25%'}]}>
                                <Text style={styles.title}>Welcome!</Text>
                                <Text style={styles.subtitle}>Sign in to continue</Text>
                                
                                <Input
                                    icon={'account-outline'}
                                    placeholder={'Email'}
                                    autoCapitalize='none'
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                />
                                <Input
                                    ref={passwordRef}
                                    icon={'lock-outline'}
                                    top={18}
                                    placeholder={'**********'}
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                />
            
                                <View style={styles.passwordContainer}>
                                    <Text style={styles.forgot}>Forgot password?</Text>
                                </View>
            
                                <Button 
                                    buttonContainer={{height: 55, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F32B2F'}}
                                    title={'SIGN IN'}
                                    titleStyle={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}
                                />
                            </View>
                            <View style={styles.fill}/>
                        </>
                }
            </Animated.View>
            <SafeAreaView style={{flex: 0, backgroundColor: '#F32B2F'}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    relleno: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    fotoPerfil: {
        height: 900,
        backgroundColor: '#2C7873',
        position: 'absolute',
        top: -600,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        height: 'auto',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#000',
        marginBottom: 20
    },
    passwordContainer: {
        height: 'auto',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    forgot: {
        fontSize: 14,
        fontWeight: '500',
        color: '#F32B2F',
        textDecorationColor: '#F32B2F',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    }
})