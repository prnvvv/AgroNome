import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { usePathname } from 'expo-router';

export default function TabLayout() {
  const pathname = usePathname();
  
  // Get the current page name based on pathname
  const getPageTitle = () => {
    switch (pathname) {
      case '/Dashboard':
        return 'Dashboard';
      case '/CropCare':
        return 'Crop Care';
      case '/MotorControl':
        return 'Motor Control';
      case '/Community':
        return 'Community';
      case '/Trends':
        return 'Trends';
      default:
        return 'Dashboard';
    }
  };

  const handleMenuPress = () => {
    // Handle hamburger menu press
    console.log('Menu pressed');
  };

  const handleUserPress = () => {
    // Handle user profile press
    console.log('User profile pressed');
  };

  return (
    <>
      <View style={styles.header}>
        {/* Left side - Hamburger Menu */}
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="menu" 
            size={24} 
            color="#000000" 
          />
        </TouchableOpacity>

        {/* Center - Page Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {getPageTitle()}
          </Text>
        </View>

        {/* Right side - User Profile */}
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleUserPress}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="person-circle-outline" 
            size={24} 
            color="#000000" 
          />
        </TouchableOpacity>
      </View>
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#000', // Black for active
          tabBarInactiveTintColor: '#666', // Gray for inactive
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
            marginBottom: 2,
          },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#FFFFFF', // Pure white background
            borderTopWidth: 0,
            borderRadius: 35,
            marginHorizontal: 20,
            marginBottom: Platform.OS === 'ios' ? 35 : 25,
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
            paddingHorizontal: 12,
            // Enhanced shadow for floating effect
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 12,
            // Border for definition
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.08)',
            opacity: 0.9, // Slightly transparent for a modern look
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
        }}>
        <Tabs.Screen
          name="Dashboard"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={28} 
                color={focused ? '#000' : '#666'} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="CropCare"
          options={{
            title: 'Crop Care',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "leaf" : "leaf-outline"} 
                size={28} 
                color={focused ? '#000' : '#666'} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="MotorControl"
          options={{
            title: 'Motor',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "flash" : "flash-outline"} 
                size={28} 
                color={focused ? '#000' : '#666'} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Community"
          options={{
            title: 'Community',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "people" : "people-outline"} 
                size={28} 
                color={focused ? '#000' : '#666'} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Trends"
          options={{
            title: 'Trends',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "analytics" : "analytics-outline"} 
                size={28} 
                color={focused ? '#000' : '#666'} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="test"
          options={{
            href: null, // Hide test file from tabs
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});
