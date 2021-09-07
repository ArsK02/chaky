import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { SCREEN_CONTAINER_STYLE, THEME } from '../theme';

export const taskDetailScreen = ({ navigation, route }) => {
    const { title } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation]);

    return (
        <View style={SCREEN_CONTAINER_STYLE}>
            <View style={styles.timerContainer}>
                <Text style={styles.timerTime}>00:00:000</Text>
                <View style={styles.timerButtonsContainer}>
                    <View style={styles.timerButton}>
                        <Button title='Start' onPress={() => { }} color={THEME.PRIMARY} />
                    </View>
                    <View style={styles.timerButton}>
                        <Button title='Stop' onPress={() => { }} color={THEME.PRIMARY_DARK} />
                    </View>


                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        alignItems: 'center',
        paddingVertical: 30
    },
    timerTime: {
        marginBottom: 15,
        fontSize: 24,
        lineHeight: 28,
        fontWeight: 'bold',
        color: THEME.DARK,
    },
    timerButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    timerButton: {
        width: '40%'
    }
});