import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';

import { THEME, SCREEN_CONTAINER_STYLE } from '../theme';
import { LoginModal } from './modals/LoginModal';

const FILE_NAME = 'cambiado';

export const tasksListScreen = ({ navigation: { navigate } }) => {
    const [loginOpened, setLoginOpened] = useState(true);
    const [notifModalOpened, setNotifModalOpened] = useState(false);
    const [notifData, setNotifData] = useState('');
    const [data, setData] = useState([]);
    const [pushToken, setPushToken] = useState('');

    const getPushToken = async () => {
        try {
            const value = await AsyncStorage.getItem('pushToken')
            if (value !== null) {
                setPushToken(value);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchTasksList = async () => {
        try {
            let res = await fetch(`https://xlsdata.herokuapp.com/file?name=${FILE_NAME}.csv`)
            let json = await res.json();
            setData(json.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasksList();
        getPushToken();
    }, []);

    const copyToClipboard = () => {
        Clipboard.setString(pushToken);
    };

    //Notifications
    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                setLoginOpened(false);
                setNotifData(response.notification.request.content.body);
                setNotifModalOpened(true);
            }
        );

        return () => {
            backgroundSubscription.remove();
        };
    }, []);

    return (
        <View style={SCREEN_CONTAINER_STYLE}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    {data.length ? data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={styles.taskItem}
                                onPress={() => navigate('TaskDetail', { title: item.field1 })}
                                activeOpacity={0.7}
                                key={index}
                            >
                                <Text style={styles.taskItemText}>{item.field1}</Text>
                            </TouchableOpacity>
                        );
                    })
                        : null}
                </View>

                {pushToken && pushToken.length ?
                    <View style={styles.pushTokenContainer}>
                        <Text style={styles.pushTokenText}>{pushToken}</Text>
                        <Button title="Copy" onPress={copyToClipboard} color={THEME.PRIMARY} />
                    </View> : null}
            </ScrollView>

            <Modal
                animationType="slide"
                visible={loginOpened}
                onRequestClose={() => { }}
            >
                <LoginModal setLoginOpened={setLoginOpened} />
            </Modal>
            <Modal
                animationType="slide"
                visible={notifModalOpened}
                onRequestClose={() => { }}
                style={styles.notifModal}
            >
                <View style={styles.notifModalContainer}>
                    <Text style={styles.notifText}>{notifData}</Text>
                <View style={styles.notifButtonsContainer}>
                    <View style={styles.notifButton}>
                        <Button title="No" onPress={() => setNotifModalOpened(false)} color={THEME.PRIMARY} />
                    </View>
                    <View style={styles.notifButton}>
                        <Button title="Si" onPress={() => setNotifModalOpened(false)} color={THEME.PRIMARY} />
                    </View>
                </View>
                </View>
                
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    taskItem: {
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: THEME.PRIMARY_LIGHT
    },
    taskItemText: {
        fontSize: 16,
        lineHeight: 24
    },
    pushTokenContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pushTokenText: {
        fontSize: 12,
        marginRight: 10
    },
    notifModal: {
        flex: 1
    },  
    notifModalContainer: {
        flex: 1,
    },
    notifText: {
        marginTop: 40,
        marginBottom: 50,
        fontSize: 22,
        lineHeight: 26,
        textAlign: 'center'
    },
    notifButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    notifButton: {
        width: '40%'
    }
});