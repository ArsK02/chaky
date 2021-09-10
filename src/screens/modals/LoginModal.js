import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';

import { THEME } from '../../theme';

const VALID_EMAIL = 'moises@galvintec.com';
const VALID_PASS = '123456';

export const LoginModal = ({ setLoginOpened }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [invalidForm, setInvalidForm] = useState(false);

    useEffect(() => {
        if (email.length && password.length) {
            setButtonDisabled(false);
            setInvalidForm(false);
        }
    }, [email, password]);

    const login = () => {
        if (email.toLowerCase() === VALID_EMAIL.toLowerCase() && password === VALID_PASS) {
            setLoginOpened(false)
        } else {
            setInvalidForm(true);
            setButtonDisabled(true);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.screenContainer}>
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.textInput}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />

                {invalidForm &&
                    <Text style={styles.invalidFormText}>Enter valid email and password</Text>
                }

                <Button
                    title='Login'
                    onPress={() => login()}
                    color={THEME.PRIMARY_DARK}
                    disabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    textInput: {
        height: 45,
        marginBottom: 15,
        borderColor: THEME.PRIMARY_DARK,
        borderBottomWidth: 2
    },
    invalidFormText: {
        marginBottom: 10,
        color: THEME.DANGER,
        fontSize: 12,
        lineHeight: 18
    }
});