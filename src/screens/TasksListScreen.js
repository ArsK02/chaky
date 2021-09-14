import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Button, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';

import { THEME, SCREEN_CONTAINER_STYLE } from '../theme';
import { LoginModal } from './modals/LoginModal';

const FILE_NAME = 'cambiado';

export const tasksListScreen = ({ navigation: { navigate } }) => {
    const [loginOpened, setLoginOpened] = useState(true);
    const [data, setData] = useState([]);
    const [pushToken, setPushToken] = useState('');
    const [refreshing, setRefreshing] = useState(false);

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
            setRefreshing(false);
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTasksList();
    }, []);

    //Notifications
    useEffect(() => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                setLoginOpened(false);
                navigate('notifModal', { text: response.notification.request.content.body })
            }
        );

        return () => {
            backgroundSubscription.remove();
        };
    }, []);

    return (
        <View style={SCREEN_CONTAINER_STYLE}>
            {data.length ?
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                style={styles.taskItem}
                                onPress={() => navigate('TaskDetail', { title: item.field1 || '' })}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.taskItemText}>{item.field1 || ''}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    style={styles.scrollContainer}
                />
                : null}

            {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
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

              
            </ScrollView> */}

            {pushToken && pushToken.length ?
                <View style={styles.pushTokenContainer}>
                    <Text style={styles.pushTokenText}>{pushToken}</Text>
                    <Button title="Copy" onPress={copyToClipboard} color={THEME.PRIMARY} />
                </View> : null}

            <Modal
                animationType="slide"
                visible={loginOpened}
                onRequestClose={() => { }}
            >
                <LoginModal setLoginOpened={setLoginOpened} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingVertical: 15,
    },
    taskItem: {
        width: '100%',
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
});