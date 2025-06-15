import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Dashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      
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
            {/* Light themed map background */}
            <View style={styles.mapBackground}>
              {/* Road lines */}
              <View style={[styles.road, styles.horizontalRoad1]} />
              <View style={[styles.road, styles.horizontalRoad2]} />
              <View style={[styles.road, styles.verticalRoad1]} />
              <View style={[styles.road, styles.verticalRoad2]} />
              
              {/* Buildings/Areas */}
              <View style={[styles.building, styles.building1]} />
              <View style={[styles.building, styles.building2]} />
              <View style={[styles.building, styles.building3]} />
              <View style={[styles.building, styles.building4]} />
              
              {/* Green spaces */}
              <View style={[styles.greenSpace, styles.park1]} />
              <View style={[styles.greenSpace, styles.park2]} />
            </View>
            
            {/* Map pins for cold storage locations */}
            <View style={styles.mapOverlay}>
              <View style={[styles.mapPin, { top: 45, left: 60 }]}>
                <View style={styles.pinContainer}>
                  <Ionicons name="location" size={24} color="#FF6B6B" />
                  <Text style={styles.pinLabel}>Storage A</Text>
                </View>
              </View>
              
              <View style={[styles.mapPin, { top: 70, right: 70 }]}>
                <View style={styles.pinContainer}>
                  <Ionicons name="location" size={24} color="#4ECDC4" />
                  <Text style={styles.pinLabel}>Storage B</Text>
                </View>
              </View>
              
              <View style={[styles.mapPin, { bottom: 40, left: 110 }]}>
                <View style={styles.pinContainer}>
                  <Ionicons name="location" size={24} color="#45B7D1" />
                  <Text style={styles.pinLabel}>Storage C</Text>
                </View>
              </View>
            </View>
            
            {/* Map controls */}
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.mapButton}>
                <Ionicons name="add" size={16} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton}>
                <Ionicons name="remove" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            {/* Map attribution */}
            <Text style={styles.mapAttribution}>© OpenStreetMap</Text>
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
    backgroundColor: '#f5f5f5',
    height: 180,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  road: {
    position: 'absolute',
    backgroundColor: '#e8e8e8',
  },
  horizontalRoad1: {
    top: 60,
    left: 0,
    right: 0,
    height: 8,
  },
  horizontalRoad2: {
    bottom: 50,
    left: 0,
    right: 0,
    height: 8,
  },
  verticalRoad1: {
    left: 80,
    top: 0,
    bottom: 0,
    width: 8,
  },
  verticalRoad2: {
    right: 90,
    top: 0,
    bottom: 0,
    width: 8,
  },
  building: {
    position: 'absolute',
    backgroundColor: '#d4d4d4',
    borderRadius: 4,
  },
  building1: {
    top: 20,
    left: 20,
    width: 50,
    height: 30,
  },
  building2: {
    top: 20,
    right: 20,
    width: 60,
    height: 25,
  },
  building3: {
    bottom: 20,
    left: 30,
    width: 40,
    height: 20,
  },
  building4: {
    bottom: 15,
    right: 30,
    width: 45,
    height: 25,
  },
  greenSpace: {
    position: 'absolute',
    backgroundColor: '#c8e6c9',
    borderRadius: 6,
  },
  park1: {
    top: 100,
    left: 100,
    width: 30,
    height: 25,
  },
  park2: {
    top: 30,
    right: 120,
    width: 25,
    height: 20,
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
    alignItems: 'center',
  },
  pinContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pinLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  mapControls: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
    gap: 5,
  },
  mapButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 6,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mapAttribution: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    color: '#666',
    fontSize: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
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
