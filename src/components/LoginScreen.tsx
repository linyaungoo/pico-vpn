import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

import { MainStackParamList } from "../NavigationParamList";

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            
            // Check credentials (default: admin/admin)
            if (username === "admin" && password === "admin") {
                navigation.navigate("VPN");
            } else {
                Dialogs.alert({
                    title: "Login Failed",
                    message: "Invalid username or password. Please try again.",
                    okButtonText: "OK"
                });
            }
        }, 1000);
    };

    return (
        <gridLayout rows="auto, *, auto" columns="*" style={styles.container}>
            {/* Header */}
            <stackLayout row="0" col="0" className="w-full items-center justify-center p-8">
                <label className="text-6xl mb-2" textWrap={true}>🔒</label>
                <label className="text-3xl font-bold text-blue-700">PICO VPN</label>
                <label className="text-sm text-gray-500 mt-1">Secure. Fast. Private.</label>
            </stackLayout>
            
            {/* Login Form */}
            <stackLayout row="1" col="0" className="w-full px-8">
                <stackLayout className="w-full rounded-xl bg-white p-6" style={styles.formCard}>
                    <label className="text-xl font-bold text-gray-800 mb-6">Sign In</label>
                    
                    <label className="text-sm font-medium text-gray-600 mb-1">Username</label>
                    <textField 
                        className="border-b border-gray-300 p-2 mb-4"
                        hint="Enter your username"
                        text={username}
                        onTextChange={(args) => setUsername(args.value)}
                        style={styles.input}
                    />
                    
                    <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
                    <textField 
                        className="border-b border-gray-300 p-2 mb-6"
                        hint="Enter your password"
                        text={password}
                        secure={true}
                        onTextChange={(args) => setPassword(args.value)}
                        style={styles.input}
                    />
                    
                    <button 
                        className={`rounded-lg w-full p-3 text-white text-center font-bold ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
                        style={styles.loginButton}
                        onTap={handleLogin}
                        isEnabled={!isLoading}
                    >
                        {isLoading ? "SIGNING IN..." : "SIGN IN"}
                    </button>
                </stackLayout>
            </stackLayout>
            
            {/* Footer */}
            <stackLayout row="2" col="0" className="w-full items-center justify-center p-6">
                <label className="text-gray-600 mb-2">Don't have an account?</label>
                <button 
                    className="text-blue-600 font-bold"
                    onTap={() => navigation.navigate("Signup")}
                >
                    CREATE ACCOUNT
                </button>
            </stackLayout>
        </gridLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8fafc",
    },
    formCard: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    input: {
        fontSize: 16,
    },
    loginButton: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
});