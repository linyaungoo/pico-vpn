import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

import { MainStackParamList } from "../NavigationParamList";

type SignupScreenProps = {
    route: RouteProp<MainStackParamList, "Signup">,
    navigation: FrameNavigationProp<MainStackParamList, "Signup">,
};

export function SignupScreen({ navigation }: SignupScreenProps) {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSignup = () => {
        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            Dialogs.alert({
                title: "Missing Information",
                message: "Please fill in all fields.",
                okButtonText: "OK"
            });
            return;
        }
        
        if (password !== confirmPassword) {
            Dialogs.alert({
                title: "Password Mismatch",
                message: "Passwords do not match. Please try again.",
                okButtonText: "OK"
            });
            return;
        }
        
        setIsLoading(true);
        
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            
            Dialogs.alert({
                title: "Account Created",
                message: "Your account has been created successfully. Please sign in.",
                okButtonText: "OK"
            }).then(() => {
                navigation.navigate("Login");
            });
        }, 1500);
    };

    return (
        <gridLayout rows="auto, *, auto" columns="*" style={styles.container}>
            {/* Header */}
            <stackLayout row="0" col="0" className="w-full items-center justify-center p-6">
                <label className="text-5xl mb-2" textWrap={true}>🔒</label>
                <label className="text-2xl font-bold text-blue-700">Create Your Account</label>
                <label className="text-sm text-gray-500 mt-1">Join PICO VPN today</label>
            </stackLayout>
            
            {/* Signup Form */}
            <scrollView row="1" col="0" className="w-full px-8">
                <stackLayout className="w-full rounded-xl bg-white p-6" style={styles.formCard}>
                    <label className="text-sm font-medium text-gray-600 mb-1">Username</label>
                    <textField 
                        className="border-b border-gray-300 p-2 mb-4"
                        hint="Choose a username"
                        text={username}
                        onTextChange={(args) => setUsername(args.value)}
                        style={styles.input}
                    />
                    
                    <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
                    <textField 
                        className="border-b border-gray-300 p-2 mb-4"
                        hint="Enter your email"
                        text={email}
                        keyboardType="email"
                        onTextChange={(args) => setEmail(args.value)}
                        style={styles.input}
                    />
                    
                    <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
                    <textField 
                        className="border-b border-gray-300 p-2 mb-4"
                        hint="Create a password"
                        text={password}
                        secure={true}
                        onTextChange={(args) => setPassword(args.value)}
                        style={styles.input}
                    />
                    
                    <label className="text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                    <textField 
                        className="border-b border-gray-300 p-2 mb-6"
                        hint="Confirm your password"
                        text={confirmPassword}
                        secure={true}
                        onTextChange={(args) => setConfirmPassword(args.value)}
                        style={styles.input}
                    />
                    
                    <button 
                        className={`rounded-lg w-full p-3 text-white text-center font-bold ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}
                        style={styles.signupButton}
                        onTap={handleSignup}
                        isEnabled={!isLoading}
                    >
                        {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                    </button>
                </stackLayout>
            </scrollView>
            
            {/* Footer */}
            <stackLayout row="2" col="0" className="w-full items-center justify-center p-6">
                <label className="text-gray-600 mb-2">Already have an account?</label>
                <button 
                    className="text-blue-600 font-bold"
                    onTap={() => navigation.navigate("Login")}
                >
                    SIGN IN
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
    signupButton: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    }
});