import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { FrameNavigationProp } from 'react-nativescript-navigation';

import { MainStackParamList } from '../NavigationParamList';

type VpnScreenProps = {
  route: RouteProp<MainStackParamList, 'VPN'>;
  navigation: FrameNavigationProp<MainStackParamList, 'VPN'>;
};

export function VpnScreen({ navigation }: VpnScreenProps) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const toggleConnection = () => {
    if (isConnecting) return;

    const newConnectionState = !isConnected;
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnected(newConnectionState);
      setIsConnecting(false);

      if (newConnectionState) {
        setElapsedTime(0);
        timerRef.current = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000);

        Dialogs.alert({
          title: 'Connected',
          message: 'You are now connected to PICO VPN',
          okButtonText: 'OK',
        });
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        Dialogs.alert({
          title: 'Disconnected',
          message: 'You have disconnected from PICO VPN',
          okButtonText: 'OK',
        });
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    Dialogs.confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result) {
        if (isConnected && timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        navigation.navigate('Login');
      }
    });
  };

  return (
    <gridLayout rows="auto, *, auto" columns="*" style={styles.container}>
      <gridLayout
        row="0"
        column="0"
        rows="auto"
        columns="*, auto"
        className="p-6 bg-blue-600 text-white"
      >
        <stackLayout row="0" column="0" className="items-start">
          <label className="text-3xl font-bold">PICO VPN</label>
          <label className="text-sm">Secure & Private Browsing</label>
        </stackLayout>
        <button
          row="0"
          column="1"
          className="text-white text-sm font-bold"
          onTap={handleLogout}
        >
          LOGOUT
        </button>
      </gridLayout>

      <stackLayout
        row="1"
        column="0"
        className="w-full items-center justify-center mt-10"
      >
        <stackLayout
          className={`rounded-full w-64 h-64 items-center justify-center shadow-xl ${
            isConnecting
              ? 'bg-yellow-500'
              : isConnected
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          <label className="text-6xl text-white">🔒</label>
          <label className="text-white text-2xl font-bold mt-2">
            {isConnecting
              ? 'CONNECTING...'
              : isConnected
              ? 'PROTECTED'
              : 'UNPROTECTED'}
          </label>
          {isConnected && (
            <label className="text-white text-lg mt-2">
              {formatTime(elapsedTime)}
            </label>
          )}
        </stackLayout>

        <button
          className={`rounded-lg px-10 py-4 mt-6 text-white text-xl font-bold shadow-md ${
            isConnecting
              ? 'bg-gray-500'
              : isConnected
              ? 'bg-red-600'
              : 'bg-blue-600'
          }`}
          onTap={toggleConnection}
          isEnabled={!isConnecting}
        >
          {isConnecting
            ? 'CONNECTING...'
            : isConnected
            ? 'DISCONNECT'
            : 'CONNECT'}
        </button>
      </stackLayout>

      <stackLayout row="2" column="0" className="w-full px-6 pb-8">
        <stackLayout className="rounded-xl bg-white p-5 shadow-md border border-gray-200">
          <gridLayout rows="auto, auto, auto" columns="*, *" className="w-full">
            <label row="0" column="0" className="text-gray-600 font-bold">
              STATUS
            </label>
            <label
              row="0"
              column="1"
              className={`text-right font-bold ${
                isConnecting
                  ? 'text-yellow-600'
                  : isConnected
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {isConnecting
                ? 'Connecting...'
                : isConnected
                ? 'Connected'
                : 'Not Connected'}
            </label>
            <label row="1" column="0" className="text-gray-600 font-bold mt-4">
              IP ADDRESS
            </label>
            <label row="1" column="1" className="text-right font-bold mt-4">
              {isConnected ? '198.51.100.42' : 'Not Protected'}
            </label>
            <label row="2" column="0" className="text-gray-600 font-bold mt-4">
              LOCATION
            </label>
            <label row="2" column="1" className="text-right font-bold mt-4">
              {isConnected ? 'Japan' : '—'}
            </label>
          </gridLayout>
        </stackLayout>
      </stackLayout>
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f8',
  },
});
