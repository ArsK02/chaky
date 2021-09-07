import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { THEME, SCREEN_CONTAINER_STYLE } from '../theme';
import { LoginModal } from './modals/LoginModal';

export const tasksListScreen = ({ navigation: { navigate } }) => {
    const [loginOpened, setLoginOpened] = useState(true);

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
                <TouchableOpacity
                    style={styles.taskItem}
                    onPress={() => navigate('TaskDetail', { title: 'Task 1' })}
                    activeOpacity={0.7}
                >
                    <Text style={styles.taskItemText}>Task 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.taskItem}
                    onPress={() => navigate('TaskDetail', { title: 'Task 2' })}
                    activeOpacity={0.7}
                >
                    <Text style={styles.taskItemText}>Task 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.taskItem}
                    onPress={() => navigate('TaskDetail', { title: 'Task 3' })}
                    activeOpacity={0.7}
                >
                    <Text style={styles.taskItemText}>Task 3</Text>
                </TouchableOpacity>
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