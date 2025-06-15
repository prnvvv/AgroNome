import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from './Navbar';

interface TrendsProps {
  onNavigate: (screen: string) => void;
}

interface CropData {
  name: string;
  wholesalePrice: number;
  retailPrice: { min: number; max: number };
  lastUpdated: string;
  priceData: number[];
}

const Trends: React.FC<TrendsProps> = ({ onNavigate }) => {
  const [selectedCrop, setSelectedCrop] = useState('Onion Big');

  const cropData: CropData = {
    name: 'Onion Big',
    wholesalePrice: 45,
    retailPrice: { min: 52, max: 57 },
    lastUpdated: 'Today',
    priceData: [38, 39, 41, 43, 46, 48, 50, 52, 54, 56],
  };

  const renderChart = () => {
    const maxPrice = Math.max(...cropData.priceData);
    const minPrice = Math.min(...cropData.priceData);
    const range = maxPrice - minPrice;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartArea}>
          {/* Y-axis labels */}
          <View style={styles.yAxisLabels}>
            <Text style={styles.axisLabel}>₹{maxPrice}</Text>
            <Text style={styles.axisLabel}>₹{Math.round(minPrice + range * 0.75)}</Text>
            <Text style={styles.axisLabel}>₹{Math.round(minPrice + range * 0.5)}</Text>
            <Text style={styles.axisLabel}>₹{Math.round(minPrice + range * 0.25)}</Text>
            <Text style={styles.axisLabel}>₹{minPrice}</Text>
          </View>

          {/* Chart plot area */}
          <View style={styles.plotArea}>
            {/* Grid lines */}
            <View style={styles.gridLines}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.gridLine} />
              ))}
            </View>

            {/* Price line */}
            <View style={styles.priceLine}>
              {cropData.priceData.map((price, index) => {
                const bottomPosition = ((price - minPrice) / range) * 100;
                return (
                  <View
                    key={index}
                    style={[
                      styles.pricePoint,
                      {
                        bottom: `${bottomPosition}%`,
                        left: `${(index / (cropData.priceData.length - 1)) * 100}%`,
                      },
                    ]}
                  />
                );
              })}
            </View>

            {/* Trend area fill */}
            <View style={styles.trendFill} />
          </View>
        </View>

        <Text style={styles.chartTitle}>Price Trend (Wholesale vs Retail)</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Navbar title="Trends" onNavigate={onNavigate} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Crop Selector */}
        <View style={styles.cropSelector}>
          <TouchableOpacity style={styles.dropdownButton}>
            <Ionicons name="bag-outline" size={20} color="#4CAF50" />
            <Text style={styles.dropdownText}>{selectedCrop}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Price Info Card */}
        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.cropName}>{cropData.name}</Text>
            <Text style={styles.pricePerKg}>₹ {cropData.wholesalePrice}/1kg</Text>
            <Text style={styles.priceType}>Wholesale Price</Text>
            <Text style={styles.lastUpdated}>Last Updated: {cropData.lastUpdated}</Text>
          </View>

          {/* Price Comparison */}
          <View style={styles.priceComparison}>
            <View style={styles.priceItem}>
              <View style={[styles.priceIcon, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.priceLabel}>Wholesale</Text>
              <Text style={styles.priceValue}>₹ {cropData.wholesalePrice}</Text>
            </View>

            <View style={styles.priceItem}>
              <View style={[styles.priceIcon, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.priceLabel}>Retail</Text>
              <Text style={styles.priceValue}>
                ₹ {cropData.retailPrice.min} - {cropData.retailPrice.max}
              </Text>
            </View>
          </View>

          {/* Chart */}
          {renderChart()}
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
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="trending-up" size={24} color="#4A90E2" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Trends</Text>
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
  cropSelector: {
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  priceCard: {
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
    elevation: 2,
  },
  priceHeader: {
    marginBottom: 20,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  pricePerKg: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  priceType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  priceComparison: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 20,
  },
  priceItem: {
    flex: 1,
    alignItems: 'center',
  },
  priceIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  chartContainer: {
    marginTop: 10,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
  },
  chartArea: {
    height: 200,
    flexDirection: 'row',
  },
  yAxisLabels: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  axisLabel: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
  },
  plotArea: {
    flex: 1,
    position: 'relative',
    marginLeft: 10,
  },
  gridLines: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  priceLine: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 0,
    right: 0,
  },
  pricePoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginLeft: -3,
  },
  trendFill: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

export default Trends;