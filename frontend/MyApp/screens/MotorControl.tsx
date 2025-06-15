import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from './Navbar';

interface MotorControlProps {
  onNavigate: (screen: string) => void;
}

const MotorControl: React.FC<MotorControlProps> = ({ onNavigate }) => {
  const [motorStatus, setMotorStatus] = useState(false);

  return (
    <View style={styles.container}>
      <Navbar title="Motor Control" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Motor Control Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Motor Control</Text>
            <View style={styles.motorIcon}>
              <Ionicons name="build-outline" size={24} color="#999" />
            </View>
          </View>
          
          <View style={styles.motorStatusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Motor Status:</Text>
              <Switch
                value={motorStatus}
                onValueChange={setMotorStatus}
                trackColor={{ false: '#d1d5db', true: '#60a5fa' }}
                thumbColor={motorStatus ? '#fff' : '#fff'}
              />
            </View>
            <Text style={styles.statusText}>OFF</Text>
          </View>
        </View>

        {/* Motor Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motor Information</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="time-outline" size={16} color="#10b981" />
              </View>
              <Text style={styles.infoLabel}>Up Time:</Text>
              <Text style={styles.infoValue}>20 mins</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="flash-outline" size={16} color="#10b981" />
              </View>
              <Text style={styles.infoLabel}>Power Used:</Text>
              <Text style={styles.infoValue}>100.00 kWh</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="hourglass-outline" size={16} color="#10b981" />
              </View>
              <Text style={styles.infoLabel}>Total Run Time:</Text>
              <Text style={styles.infoValue}>100.00 h</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="water-outline" size={16} color="#10b981" />
              </View>
              <Text style={styles.infoLabel}>Total Water Used:</Text>
              <Text style={styles.infoValue}>1000.00 L</Text>
            </View>
          </View>
        </View>

        {/* Controls Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controls</Text>
          
          <View style={styles.controlsContainer}>
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Motor Power: 50%</Text>
            </View>
            
            <View style={styles.controlRow}>
              <View style={styles.controlIcon}>
                <Ionicons name="refresh-outline" size={16} color="#10b981" />
              </View>
              <Text style={styles.controlValue}>50</Text>
            </View>
            
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Water Flow: 5.00 L/s</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('Dashboard')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => onNavigate('CropCare')}
        >
          <Ionicons name="crop" size={24} color="#666" />
          <Text style={styles.navLabel}>Crop Care</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} color="#4A90E2" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Motor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
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
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  motorIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  motorStatusContainer: {
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    color: '#374151',
    marginRight: 15,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  controlsContainer: {
    marginTop: 10,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  controlIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  controlValue: {
    fontSize: 16,
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

export default MotorControl;