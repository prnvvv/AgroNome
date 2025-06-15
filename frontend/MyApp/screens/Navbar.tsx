import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavbarProps {
  title: string;
  onNavigate?: (screen: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, onNavigate }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => onNavigate && onNavigate('Dashboard')}
      >
        <Ionicons name="menu" size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      <TouchableOpacity style={styles.profileButton}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingTop: 50, // Account for status bar
  },
  menuButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navbar;