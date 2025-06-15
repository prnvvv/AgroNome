import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <View style={{ 
          backgroundColor: 'white', 
          paddingHorizontal: 20, 
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
            Dashboard
          </Text>
        </View>
        
        <ScrollView 
          style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Temperature and Humidity Cards */}
          <View style={{ 
            flexDirection: 'row', 
            marginBottom: 20,
            gap: 15 
          }}>
            <View style={{ 
              flex: 1, 
              padding: 20, 
              borderRadius: 12, 
              backgroundColor: '#dcfce7',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="thermometer-outline" size={20} color="#666" />
                <Text style={{ fontSize: 14, color: '#666', marginLeft: 8 }}>
                  Temperature
                </Text>
              </View>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>
                28°C
              </Text>
            </View>
            
            <View style={{ 
              flex: 1, 
              padding: 20, 
              borderRadius: 12, 
              backgroundColor: '#dcfce7',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="water-outline" size={20} color="#666" />
                <Text style={{ fontSize: 14, color: '#666', marginLeft: 8 }}>
                  Humidity
                </Text>
              </View>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>
                60%
              </Text>
            </View>
          </View>

          {/* NPK Values */}
          <View style={{ 
            flexDirection: 'row', 
            marginBottom: 24,
            gap: 12 
          }}>
            <View style={{ 
              flex: 1, 
              backgroundColor: 'white', 
              padding: 16, 
              borderRadius: 12, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="leaf-outline" size={16} color="#666" />
                <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>
                  Nitrogen
                </Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
                180
              </Text>
              <Text style={{ fontSize: 12, color: '#666' }}>PPM</Text>
            </View>
            
            <View style={{ 
              flex: 1, 
              backgroundColor: 'white', 
              padding: 16, 
              borderRadius: 12, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="leaf-outline" size={16} color="#666" />
                <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>
                  Phosphorus
                </Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
                160
              </Text>
              <Text style={{ fontSize: 12, color: '#666' }}>PPM</Text>
            </View>
            
            <View style={{ 
              flex: 1, 
              backgroundColor: 'white', 
              padding: 16, 
              borderRadius: 12, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="leaf-outline" size={16} color="#666" />
                <Text style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>
                  Potassium
                </Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
                170
              </Text>
              <Text style={{ fontSize: 12, color: '#666' }}>PPM</Text>
            </View>
          </View>

          {/* Cold Storage Location */}
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginLeft: 8 }}>
                Cold Storage Location
              </Text>
            </View>
            
            <View style={{ 
              position: 'relative', 
              borderRadius: 12, 
              overflow: 'hidden', 
              backgroundColor: '#374151',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3
            }}>
              <Image
                source={{ uri: 'https://via.placeholder.com/350x150/374151/ffffff?text=Map+View' }}
                style={{ width: '100%', height: 150 }}
                resizeMode="cover"
              />
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <View style={{ position: 'absolute', top: 40, left: 50 }}>
                  <Ionicons name="location" size={20} color="#ef4444" />
                </View>
                <View style={{ position: 'absolute', top: 80, right: 60 }}>
                  <Ionicons name="location" size={20} color="#22c55e" />
                </View>
                <View style={{ position: 'absolute', bottom: 30, left: 100 }}>
                  <Ionicons name="location" size={20} color="#3b82f6" />
                </View>
              </View>
              <Text style={{ 
                position: 'absolute', 
                bottom: 12, 
                left: 16, 
                color: 'white', 
                fontSize: 12, 
                fontWeight: '500' 
              }}>
                Storage Locations
              </Text>
            </View>
          </View>

          {/* Agriculture News */}
          <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="newspaper-outline" size={20} color="#666" />
              <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginLeft: 8 }}>
                Agriculture News
              </Text>
            </View>
            
            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              backgroundColor: '#dcfce7', 
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 12, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 8, 
                backgroundColor: '#bbf7d0', 
                marginRight: 16 
              }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginBottom: 4 }}>
                  Latest Crop Disease Prevention
                </Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  7 June, 10:00 AM
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              backgroundColor: '#dcfce7', 
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 12, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 8, 
                backgroundColor: '#bbf7d0', 
                marginRight: 16 
              }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginBottom: 4 }}>
                  Weather Alert for Farmers
                </Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  6 June, 2:30 PM
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              backgroundColor: '#dcfce7', 
              borderRadius: 12, 
              padding: 16, 
              marginBottom: 12, 
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}>
              <View style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 8, 
                backgroundColor: '#bbf7d0', 
                marginRight: 16 
              }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginBottom: 4 }}>
                  New Irrigation Techniques
                </Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  5 June, 8:15 AM
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        
      </SafeAreaView>
    </>
  );
};

export default Dashboard;