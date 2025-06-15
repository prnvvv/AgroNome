import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dashboard from './screens/Dashboard';
import CropCare from './screens/CropCare';
import MotorControl from './screens/MotorControl';
import Community from './screens/Community';
import Trends from './screens/Trends';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'CropCare':
        return <CropCare onNavigate={handleNavigate} />;
      case 'MotorControl':
        return <MotorControl onNavigate={handleNavigate} />;
      case 'Community':
        return <Community onNavigate={handleNavigate} />;
      case 'Trends':
        return <Trends onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}