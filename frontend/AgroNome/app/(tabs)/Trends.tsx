import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CropData {
  name: string;
  wholesalePrice: number;
  retailPrice: { min: number; max: number };
  lastUpdated: string;
  priceData: number[];
  change: number;
  changePercent: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - 120;
const CHART_HEIGHT = 180;

const Trends: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Onion Big');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');

  const cropOptions = [
    'Onion Big',
    'Tomato',
    'Potato',
    'Carrot',
    'Cabbage',
    'Cauliflower'
  ];

  const timeframes = ['1D', '7D', '1M', '3M', '1Y'];

  const cropData: CropData = {
    name: selectedCrop,
    wholesalePrice: 45,
    retailPrice: { min: 52, max: 57 },
    lastUpdated: 'Today, 2:30 PM',
    priceData: [38, 39, 41, 43, 46, 48, 50, 52, 54, 56],
    change: +7,
    changePercent: +13.2
  };

  const chartPoints = useMemo(() => {
    const { priceData } = cropData;
    const maxPrice = Math.max(...priceData);
    const minPrice = Math.min(...priceData);
    const range = maxPrice - minPrice || 1;

    return priceData.map((price, index) => ({
      x: (index / (priceData.length - 1)) * CHART_WIDTH,
      y: ((maxPrice - price) / range) * (CHART_HEIGHT - 40) + 20,
      price,
      index
    }));
  }, [cropData.priceData]);

  const renderChart = () => {
    const maxPrice = Math.max(...cropData.priceData);
    const minPrice = Math.min(...cropData.priceData);
    const yLabels = [
      maxPrice,
      Math.round(maxPrice * 0.75 + minPrice * 0.25),
      Math.round(maxPrice * 0.5 + minPrice * 0.5),
      Math.round(maxPrice * 0.25 + minPrice * 0.75),
      minPrice
    ];

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price Trend</Text>
          <View style={styles.timeframeContainer}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                onPress={() => setSelectedTimeframe(timeframe)}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe && styles.timeframeButtonActive
                ]}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    selectedTimeframe === timeframe && styles.timeframeTextActive
                  ]}
                >
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.chartBackground}>
          <View style={styles.chartRow}>
            {/* Y-axis labels */}
            <View style={[styles.yAxisContainer, { height: CHART_HEIGHT }]}>
              {yLabels.map((price, index) => (
                <Text key={index} style={styles.yAxisLabel}>
                  ₹{price}
                </Text>
              ))}
            </View>

            {/* Chart area */}
            <View style={styles.chartAreaContainer}>
              <View style={[styles.chartArea, { height: CHART_HEIGHT, width: CHART_WIDTH }]}>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.gridLine,
                      { top: 20 + i * ((CHART_HEIGHT - 40) / 4) }
                    ]}
                  />
                ))}

                {/* Gradient background */}
                <View
                  style={[
                    styles.gradientBackground,
                    {
                      bottom: 0,
                      height: CHART_HEIGHT * 0.6,
                    }
                  ]}
                />

                {/* Price line segments */}
                {chartPoints.slice(0, -1).map((point, index) => {
                  const nextPoint = chartPoints[index + 1];
                  const deltaX = nextPoint.x - point.x;
                  const deltaY = nextPoint.y - point.y;
                  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
                  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                  return (
                    <View
                      key={index}
                      style={[
                        styles.lineSegment,
                        {
                          left: point.x,
                          top: point.y,
                          width: length,
                          transform: [{ rotate: `${angle}deg` }],
                        }
                      ]}
                    />
                  );
                })}

                {/* Data points */}
                {chartPoints.map((point, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dataPoint,
                      {
                        left: point.x - 6,
                        top: point.y - 6,
                      }
                    ]}
                  />
                ))}

                {/* Hover effect points */}
                {chartPoints.map((point, index) => (
                  <TouchableOpacity
                    key={`touch-${index}`}
                    style={[
                      styles.touchPoint,
                      {
                        left: point.x - 15,
                        top: point.y - 15,
                      }
                    ]}
                    onPress={() => {
                      console.log(`Price: ₹${point.price} at point ${index + 1}`);
                    }}
                  />
                ))}
              </View>

              {/* X-axis labels */}
              <View style={styles.xAxisContainer}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, chartPoints.length).map((day, index) => (
                  <Text key={index} style={styles.xAxisLabel}>
                    {day}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Market Trends</Text>
            <Text style={styles.headerSubtitle}>Real-time crop pricing</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Crop Selector */}
        <View style={styles.cropSelector}>
          <Text style={styles.selectorLabel}>Select Crop</Text>
          <TouchableOpacity style={styles.cropButton}>
            <View style={styles.cropIconContainer}>
              <Ionicons name="leaf-outline" size={20} color="#10B981" />
            </View>
            <Text style={styles.cropButtonText}>{selectedCrop}</Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Price Card */}
        <View style={styles.priceCard}>
          {/* Price Header */}
          <View style={styles.priceHeader}>
            <View style={styles.priceHeaderRow}>
              <Text style={styles.cropName}>{cropData.name}</Text>
              <View style={[
                styles.changeBadge,
                { backgroundColor: cropData.change >= 0 ? '#F0FDF4' : '#FEF2F2' }
              ]}>
                <Text style={[
                  styles.changeText,
                  { color: cropData.change >= 0 ? '#15803D' : '#DC2626' }
                ]}>
                  {cropData.change >= 0 ? '+' : ''}₹{cropData.change} ({cropData.changePercent}%)
                </Text>
              </View>
            </View>
            
            <View style={styles.priceRow}>
              <Text style={styles.mainPrice}>₹{cropData.wholesalePrice}</Text>
              <Text style={styles.priceUnit}>/kg</Text>
            </View>
            
            <Text style={styles.priceLabel}>Wholesale Price</Text>
            <Text style={styles.lastUpdated}>Last updated: {cropData.lastUpdated}</Text>
          </View>

          {/* Price Comparison */}
          <View style={styles.priceComparison}>
            <View style={styles.comparisonItem}>
              <View style={[styles.colorDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.comparisonLabel}>Wholesale</Text>
              <Text style={styles.comparisonPrice}>₹{cropData.wholesalePrice}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.comparisonItem}>
              <View style={[styles.colorDot, { backgroundColor: '#F97316' }]} />
              <Text style={styles.comparisonLabel}>Retail</Text>
              <Text style={styles.comparisonPrice}>
                ₹{cropData.retailPrice.min}-{cropData.retailPrice.max}
              </Text>
            </View>
          </View>

          {/* Chart */}
          {renderChart()}
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statLabel}>Weekly High</Text>
                <Text style={styles.statValue}>₹58</Text>
              </View>
              <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
                <Ionicons name="trending-up" size={16} color="#10B981" />
              </View>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View>
                <Text style={styles.statLabel}>Weekly Low</Text>
                <Text style={styles.statValue}>₹38</Text>
              </View>
              <View style={[styles.statIcon, { backgroundColor: '#FEF2F2' }]}>
                <Ionicons name="trending-down" size={16} color="#EF4444" />
              </View>
            </View>
          </View>
        </View>

        {/* Market Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Market Insights</Text>
          
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: '#EBF8FF' }]}>
                <Ionicons name="trending-up" size={16} color="#3B82F6" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Price Trend</Text>
                <Text style={styles.insightDescription}>
                  Prices have increased by 13.2% in the last 7 days due to seasonal demand and supply constraints.
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: '#FFFBEB' }]}>
                <Ionicons name="warning-outline" size={16} color="#F59E0B" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Supply Alert</Text>
                <Text style={styles.insightDescription}>
                  Potential supply shortage expected next week. Consider adjusting your procurement strategy.
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: '#F5F3FF' }]}>
                <Ionicons name="analytics-outline" size={16} color="#8B5CF6" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Forecast</Text>
                <Text style={styles.insightDescription}>
                  Based on historical data, prices may stabilize around ₹50-52 by next month.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Set Price Alert</Text>
            <Text style={styles.primaryButtonSubtext}>Get notified of price changes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View History</Text>
            <Text style={styles.secondaryButtonSubtext}>See detailed price data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cropSelector: {
    marginBottom: 20,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  cropButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropIconContainer: {
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  cropButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  priceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 20,
  },
  priceHeader: {
    marginBottom: 20,
  },
  priceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  mainPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  priceUnit: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceComparison: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  comparisonLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  comparisonPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  chartContainer: {
    marginTop: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  timeframeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeframeButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  timeframeTextActive: {
    color: '#059669',
  },
  chartBackground: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  chartRow: {
    flexDirection: 'row',
  },
  yAxisContainer: {
    width: 40,
    justifyContent: 'space-between',
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  chartAreaContainer: {
    flex: 1,
    marginLeft: 8,
  },
  chartArea: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#F0FDF4',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    opacity: 0.5,
  },
  lineSegment: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#10B981',
    transformOrigin: '0 50%',
  },
  dataPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  touchPoint: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  quickStats: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statIcon: {
    padding: 8,
    borderRadius: 8,
  },
  insightsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  insightsList: {
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 4,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  insightDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  primaryButtonSubtext: {
    color: '#A7F3D0',
    fontSize: 12,
    marginTop: 4,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  secondaryButtonSubtext: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Trends;