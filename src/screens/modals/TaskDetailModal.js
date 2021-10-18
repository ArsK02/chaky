import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { SCREEN_CONTAINER_STYLE, THEME } from '../../theme';

export const TaskDetailModal = ({ title, isModalVisible, setIsModalVisible, startTime, setStartTime, isStopwatchStart, setIsStopwatchStart, resetStopwatch, setResetStopwatch }) => {
    const stopwatchStart = () => {
        if (isStopwatchStart) {
            setIsStopwatchStart(false);
        } else {
            setIsStopwatchStart(true);
            setStartTime(moment().valueOf());
        }
        setResetStopwatch(false);
    }

    const stopwatchReset = () => {
        setIsStopwatchStart(false);
        setStartTime(null);
    }

    useEffect(() => {
        if (!startTime) {
            setResetStopwatch(true);
        }
    }, [isStopwatchStart]);

    const getStartTime = () => {
        if (isStopwatchStart && startTime) {
            return (moment().valueOf() - startTime)
        } else {
            return 0;
        }
    }

    return (
        <Modal
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title || ''}</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Icon name="close" color={THEME.PRIMARY} size={24}></Icon>
                </TouchableOpacity>
            </View>
            <View style={SCREEN_CONTAINER_STYLE}>
                <View style={styles.stopwatchContainer}>
                    <Stopwatch
                        laps
                        msecs
                        reset={resetStopwatch}
                        start={isStopwatchStart}
                        startTime={getStartTime()}
                        options={options}
                    // getTime={(time) => {
                    //     console.log(time);
                    // }}
                    />

                    <View style={styles.stopwatchButtonsContainer}>
                        <View style={styles.stopwatchButton}>
                            <Button
                                title={isStopwatchStart ? 'Pause' : 'Start'}
                                onPress={() => stopwatchStart()}
                                color={THEME.PRIMARY}
                            />
                        </View>
                        <View style={styles.stopwatchButton}>
                            <Button
                                title='Stop'
                                onPress={() => stopwatchReset()}
                                color={THEME.PRIMARY_DARK}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    headerTitle: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: 'bold',
    },
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
        borderRadius: 185 / 2,
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