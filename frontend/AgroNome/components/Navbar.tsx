import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavbarProps {
  title: string;
  onNavigate?: (screen: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, onNavigate }) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100 pt-12">
      <TouchableOpacity
        className="p-1"
        onPress={() => onNavigate && onNavigate('Dashboard')}
      >
        <Ionicons name="menu" size={24} color="#000" />
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-black">
        {title}
      </Text>

      <TouchableOpacity className="p-1">
        <View className="w-8 h-8 rounded-full bg-black items-center justify-center">
          <Ionicons name="person" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;