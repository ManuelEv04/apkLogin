import {forwardRef, useState} from "react"
import {StyleSheet, View, TextInput, Text} from "react-native"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default forwardRef(({icon, top = 15, placeholder, ...rest}, ref) => {

    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState('')

    return(
        <View style={[styles.inputContainer, {borderColor: focus ? '#34675C' : 'transparent'}]}>
            <View style={styles.icon}>
                <Material name={icon} size={25} color={'#383838'}/>
            </View>
            <TextInput
                ref={ref}
                style={[styles.input]}
                value={value}
                onChangeText={setValue}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                selectionColor={'#fc6a6c'}
                {...rest}
            />
            {
                !value
                &&
                    <View style={[styles.holderContainer, {top: top}]} pointerEvents="none">
                        <Text style={styles.holder}>{placeholder}</Text>
                    </View>
            }
        </View>
    )
})

const styles = StyleSheet.create({
    inputContainer: {
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 100,
        borderWidth: 1.8,
        overflow: 'hidden',
        backgroundColor: '#34675C',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        height: '100%',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    holderContainer: {
        height: 20,
        position: 'absolute',
        left: 50
    },
    holder: {
        fontSize: 15,
        fontWeight: '500',
        color: '#B7B8B6'
    },
    input: {
        flex: 1,
        alignSelf: 'stretch',
        paddingRight: 12,
        fontSize: 15,
    }
})