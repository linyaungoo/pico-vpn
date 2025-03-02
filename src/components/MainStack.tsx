import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { VpnScreen } from "./VpnScreen";
import { LoginScreen } from "./LoginScreen";
import { SignupScreen } from "./SignupScreen";

const StackNavigator = stackNavigatorFactory();

/**
 * The main stack navigator for the whole app.
 */
export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#3B82F6", // Updated to a nicer blue
                },
                headerShown: true,
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                }
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "PICO VPN"
                }}
            />
            <StackNavigator.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    title: "PICO VPN - Sign Up"
                }}
            />
            <StackNavigator.Screen
                name="VPN"
                component={VpnScreen}
                options={{
                    title: "PICO VPN",
                    headerLeft: () => null // Disable back button
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);