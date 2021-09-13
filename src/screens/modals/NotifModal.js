import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, Button } from 'react-native';

import { THEME } from '../../theme';

export const notifModal = ({ navigation: { navigate }, route }) => {
    const { text } = route.params;

    return (
        <Modal
            animationType="slide"
            visible={true}
            onRequestClose={() => { }}
            style={styles.notifModal}
        >
            <View style={styles.notifModalContainer}>
                <Text style={styles.notifText}>{text}</Text>
                <View style={styles.notifButtonsContainer}>
                    <View style={styles.notifButton}>
                        <Button title="No" onPress={() => navigate('TasksList')} color={THEME.PRIMARY} />
                    </View>
                    <View style={styles.notifButton}>
                        <Button title="Si" onPress={() => navigate('TasksList')} color={THEME.PRIMARY} />
                    </View>
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
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