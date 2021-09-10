import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { THEME, SCREEN_CONTAINER_STYLE } from '../theme';
import { LoginModal } from './modals/LoginModal';

const FILE_NAME = 'cambiado';

export const tasksListScreen = ({ navigation: { navigate } }) => {
    const [loginOpened, setLoginOpened] = useState(true);
    const [data, setData] = useState([]);

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
    }, []);
    
    return (
        <View style={SCREEN_CONTAINER_STYLE}>
            <Modal
                animationType="slide"
                visible={loginOpened}
                onRequestClose={() => { }}
            >
                <LoginModal setLoginOpened={setLoginOpened} />
            </Modal>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 15
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
    }
});