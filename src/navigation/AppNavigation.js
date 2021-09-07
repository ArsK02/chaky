import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { THEME, HEADER_STYLE } from '../theme';
import { tasksListScreen } from '../screens/TasksListScreen';
import { taskDetailScreen } from '../screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: THEME.LIGHT
        },
    };

    return (
        <NavigationContainer
            theme={MyTheme}
        >
            <Stack.Navigator
                screenOptions={{
                    headerStyle: HEADER_STYLE,
                    headerTintColor: THEME.PRIMARY,
                    headerShadowVisible: false
                }}
            >
                <Stack.Screen
                    name="TasksList"
                    component={tasksListScreen}
                    options={{
                        title: 'Tasks',
                        headerLeft: () => false,
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen
                    name="TaskDetail"
                    component={taskDetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}