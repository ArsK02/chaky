import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

import { SCREEN_CONTAINER_STYLE, THEME } from '../theme';

export const taskDetailScreen = ({ navigation, route }) => {
    const { title } = route.params;

    const [isStopwatchStart, setIsStopwatchStart] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        });
    }, [navigation]);

    return (
        <View style={SCREEN_CONTAINER_STYLE}>
            <View style={styles.stopwatchContainer}>
                <Stopwatch
                    laps
                    msecs
                    start={isStopwatchStart}
                    // To start
                    //reset={resetStopwatch}
                    // To reset
                    options={options}
                    // Options for the styling
                    // getTime={(time) => {
                    //     console.log(time);
                    // }}
                />

                <View style={styles.stopwatchButtonsContainer}>
                    <View style={styles.stopwatchButton}>
                        <Button title='Start' onPress={() => setIsStopwatchStart(true)} color={THEME.PRIMARY} disabled={isStopwatchStart} />
                    </View>
                    <View style={styles.stopwatchButton}>
                        <Button title='Stop' onPress={() => setIsStopwatchStart(false)} color={THEME.PRIMARY_DARK} disabled={!isStopwatchStart} />
                    </View>


                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stopwatchContainer: {
        alignItems: 'center',
        paddingVertical: 30
    },
    stopwatchButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    stopwatchButton: {
        width: '40%'
    }
});

const options = {
    container: {
        marginBottom: 25,
        padding: 3,
        width: 185,
        height: 185,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: THEME.PRIMARY,
        borderRadius: 185/2,
        backgroundColor: THEME.PRIMARY_LIGHT
    },
    text: {
        fontSize: 24,
        lineHeight: 28,
        fontWeight: 'bold',
        color: THEME.DARK,
        marginLeft: 7,
    },
};