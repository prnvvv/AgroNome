import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from './Navbar';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Navbar title="Dashboard" onNavigate={onNavigate} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Temperature and Humidity Cards */}
        <View style={styles.topCards}>
          <View style={[styles.card, styles.temperatureCard]}>
            <View style={styles.cardHeader}>
              <Ionicons name="thermometer-outline" size={20} color="#666" />
              <Text style={styles.cardTitle}>Temperature</Text>
            </View>
            <Text style={styles.cardValue}>28°C</Text>
          </View>
          
          <View style={[styles.card, styles.humidityCard]}>
            <View style={styles.cardHeader}>
              <Ionicons name="water-outline" size={20} color="#666" />
              <Text style={styles.cardTitle}>Humidity</Text>
            </View>
            <Text style={styles.cardValue}>60%</Text>
          </View>
        </View>

        {/* NPK Values */}
        <View style={styles.npkContainer}>
          <View style={styles.npkCard}>
            <View style={styles.npkHeader}>
              <Ionicons name="leaf-outline" size={16} color="#666" />
              <Text style={styles.npkLabel}>Nitrogen</Text>
            </View>
            <Text style={styles.npkValue}>180</Text>
            <Text style={styles.npkUnit}>PPM</Text>
          </View>
          
          <View style={styles.npkCard}>
            <View style={styles.npkHeader}>
              <Ionicons name="leaf-outline" size={16} color="#666" />
              <Text style={styles.npkLabel}>Phosphorus</Text>
            </View>
            <Text style={styles.npkValue}>160</Text>
            <Text style={styles.npkUnit}>PPM</Text>
          </View>
          
          <View style={styles.npkCard}>
            <View style={styles.npkHeader}>
              <Ionicons name="leaf-outline" size={16} color="#666" />
              <Text style={styles.npkLabel}>Potassium</Text>
            </View>
            <Text style={styles.npkValue}>170</Text>
            <Text style={styles.npkUnit}>PPM</Text>
          </View>
        </View>

        {/* Cold Storage Location */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.sectionTitle}>Cold Storage Location</Text>
          </View>
          
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/350x150/333333/ffffff?text=Map+View' }}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.mapOverlay}>
              <View style={[styles.mapPin, { top: 40, left: 50 }]}>
                <Ionicons name="location" size={20} color="#ff4444" />
              </View>
              <View style={[styles.mapPin, { top: 80, right: 60 }]}>
                <Ionicons name="location" size={20} color="#44ff44" />
              </View>
              <View style={[styles.mapPin, { bottom: 30, left: 100 }]}>
                <Ionicons name="location" size={20} color="#4444ff" />
              </View>
            </View>
            <Text style={styles.mapLabel}>Google</Text>
          </View>
        </View>

        {/* Agriculture News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="newspaper-outline" size={20} color="#666" />
            <Text style={styles.sectionTitle}>Agriculture News</Text>
          </View>
          
          <TouchableOpacity style={styles.newsCard}>
            <View style={styles.newsImagePlaceholder} />
            <View style={styles.newsContent}>
              <Text style={styles.newsHeading}>News Heading</Text>
              <Text style={styles.newsTime}>7, June 10:00AM</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.newsCard}>
            <View style={styles.newsImagePlaceholder} />
            <View style={styles.newsContent}>
              <Text style={styles.newsHeading}>News Heading</Text>
              <Text style={styles.newsTime}>6, June 2:30PM</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.newsCard}>
            <View style={styles.newsImagePlaceholder} />
            <View style={styles.newsContent}>
              <Text style={styles.newsHeading}>News Heading</Text>
              <Text style={styles.newsTime}>5, June 8:15AM</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#4A90E2" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('CropCare')}
        >
          <Ionicons name="crop" size={24} color="#666" />
          <Text style={styles.navLabel}>Crop Care</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('MotorControl')}
        >
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Motor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('Community')}
        >
          <Ionicons name="people-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('Trends')}
        >
          <Ionicons name="trending-up-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Trends</Text>
        </TouchableOpacity>
      </View>
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
  topCards: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#e8f5e8',
  },
  temperatureCard: {
    backgroundColor: '#e8f5e8',
  },
  humidityCard: {
    backgroundColor: '#e8f5e8',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  npkContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  npkCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  npkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  npkLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  npkValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  npkUnit: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  mapContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  mapImage: {
    width: '100%',
    height: 150,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPin: {
    position: 'absolute',
  },
  mapLabel: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  newsImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#b8d4b8',
    marginRight: 15,
  },
  newsContent: {
    flex: 1,
  },
  newsHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  newsTime: {
    fontSize: 12,
    color: '#666',
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

export default Dashboard;