import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface CropCareProps {
  onNavigate: (screen: string) => void;
}

const CropCare: React.FC<CropCareProps> = ({ onNavigate }) => {
  const cropCareItems = [
    {
      id: 1,
      title: 'Plant Suggestion',
      icon: 'leaf-outline',
      iconBg: '#000',
    },
    {
      id: 2,
      title: 'Crop Yield',
      icon: 'trending-up-outline',
      iconBg: '#000',
    },
    {
      id: 3,
      title: 'Disease Prediction',
      icon: 'bug-outline',
      iconBg: '#000',
    },
    {
      id: 4,
      title: 'Essential Conditions',
      icon: 'hand-left-outline',
      iconBg: '#000',
    },
    {
      id: 5,
      title: 'Weed Detection',
      icon: 'flask-outline',
      iconBg: '#000',
    },
    {
      id: 6,
      title: 'Soil Fertility',
      icon: 'flower-outline',
      iconBg: '#000',
    },
  ];

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Crop Care Grid */}
        <View style={styles.gridContainer}>
          {cropCareItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => console.log(`${item.title} pressed`)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                <Ionicons 
                  name={item.icon as any} 
                  size={32} 
                  color="#fff" 
                />
              </View>
              <Text style={styles.gridItemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chatbot Section */}
        <TouchableOpacity style={styles.chatbotContainer}>
          <View style={styles.chatbotHeader}>
            <View style={styles.chatbotIcon}>
              <Ionicons name="diamond-outline" size={20} color="#000" />
            </View>
            <Text style={styles.chatbotTitle}>Chatbot</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  gridItem: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  gridItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
  },
  chatbotContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatbotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatbotIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  chatbotTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#4A90E2',
  },
});

export default CropCare;