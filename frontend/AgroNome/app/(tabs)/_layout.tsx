import { usePathname, Tabs, router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, Image, Modal, Animated } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useUser, useClerk } from '@clerk/clerk-expo';

export default function TabLayout() {
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [showDropdown, setShowDropdown] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
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
      case '/Profile':
        return 'Profile';
      default:
        return 'Dashboard';
    }
  };

  const handleMenuPress = () => {
    // Handle hamburger menu press
    console.log('Menu pressed');
  };

  const handleUserPress = () => {
    if (isSignedIn && user) {
      setShowDropdown(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowDropdown(false);
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      closeDropdown();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Render user section based on auth state
  const renderUserSection = () => {
    if (!isLoaded) {
      return (
        <View style={styles.headerButton}>
          <Ionicons 
            name="person-circle-outline" 
            size={24} 
            color="#999" 
          />
        </View>
      );
    }

    if (!isSignedIn || !user) {
      return (
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
      );
    }

    return (
      <TouchableOpacity 
        style={styles.userContainer}
        onPress={handleUserPress}
        activeOpacity={0.7}
      >
        {user.imageUrl ? (
          <Image 
            source={{ uri: user.imageUrl }} 
            style={styles.userImage}
          />
        ) : (
          <View style={styles.userInitials}>
            <Text style={styles.initialsText}>
              {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0) || 'U'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderDropdown = () => {
    if (!showDropdown || !user) return null;

    return (
      <Modal
        transparent={true}
        visible={showDropdown}
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <Animated.View 
            style={[
              styles.dropdown,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }),
                }],
              }
            ]}
          >
            {/* User Info Section */}
            <View style={styles.dropdownUserInfo}>
              {user.imageUrl ? (
                <Image 
                  source={{ uri: user.imageUrl }} 
                  style={styles.dropdownUserImage}
                />
              ) : (
                <View style={styles.dropdownUserInitials}>
                  <Text style={styles.dropdownInitialsText}>
                    {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0) || 'U'}
                  </Text>
                </View>
              )}
              <View style={styles.dropdownUserDetails}>
                <Text style={styles.dropdownUserName}>
                  {user.firstName} {user.lastName || ''}
                </Text>
                <Text style={styles.dropdownUserEmail}>
                  {user.emailAddresses[0]?.emailAddress}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.dropdownDivider} />

            {/* Menu Options */}
            <TouchableOpacity 
              style={styles.dropdownMenuItem}
              onPress={() => {
                closeDropdown();
                // Navigate to profile page
                router.push("/(tabs)/Profile");
              }}
            >
              <Ionicons name="person-outline" size={20} color="#374151" />
              <Text style={styles.dropdownMenuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dropdownMenuItem}
              onPress={() => {
                closeDropdown();
                // Navigate to settings
                console.log('Navigate to settings');
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#374151" />
              <Text style={styles.dropdownMenuText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.dropdownMenuItem, styles.signOutItem]}
              onPress={handleSignOut}
            >
              <Ionicons name="log-out-outline" size={20} color="#DC2626" />
              <Text style={[styles.dropdownMenuText, styles.signOutText]}>Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
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
        {renderUserSection()}
      </View>

      {/* Dropdown Menu */}
      {renderDropdown()}
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#666',
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
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            borderRadius: 35,
            marginHorizontal: 20,
            marginBottom: Platform.OS === 'ios' ? 35 : 25,
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
            paddingHorizontal: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 12,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.08)',
            opacity: 0.9,
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
          name="Profile"
        options={{
            href: null,
          }}
          
        />
        <Tabs.Screen
          name="test"
          options={{
            href: null,
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
    paddingTop: 10,
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
    
    fontFamily: 'Lexend-SemiBold',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userInitials: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Lexend-SemiBold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 65,
    paddingRight: 20,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  dropdownUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dropdownUserImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  dropdownUserInitials: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dropdownInitialsText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Lexend-SemiBold',
  },
  dropdownUserDetails: {
    flex: 1,
  },
  dropdownUserName: {
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  dropdownUserEmail: {
    fontSize: 14,
    fontFamily: 'Lexend-Regular',
    color: '#6B7280',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownMenuText: {
    fontSize: 15,
    fontFamily: 'Lexend-Medium',
    color: '#374151',
    marginLeft: 12,
  },
  signOutItem: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  signOutText: {
    color: '#DC2626',
  },
});
