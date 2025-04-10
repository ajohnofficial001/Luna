import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const pinkColor = '#d63384';
const lightPink = '#FFE6F2';

const InsightsView = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Example data placeholders
  const [hormoneTrend] = useState(['FSH', 'LH', 'Estrogen']);
  const [cyclePredictions] = useState(['Ovulation in 5 days', 'Next period in 12 days']);
  const [stressData] = useState([
    { day: 'Mon', level: 'Low' },
    { day: 'Tue', level: 'Mid' },
    { day: 'Wed', level: 'High' },
    { day: 'Thu', level: 'Mid' },
    { day: 'Fri', level: 'Low' },
  ]);

  const handleNavPress = (screenName) => {
    console.log(`Navigating to: ${screenName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mainContent, { minHeight: screenHeight }]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.subtitle}>Analyze Your Patterns</Text>
          </View>

          {/* Hormone Trend Section */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Hormone Levels Over Time</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionDesc}>
                Here’s a look at your average hormone levels this week:
              </Text>
              {/* Example horizontal list or placeholders */}
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {hormoneTrend.map((hormone, index) => (
                  <View key={index} style={styles.hormonePill}>
                    <Text style={{ color: pinkColor, fontWeight: '600' }}>
                      {hormone}
                    </Text>
                  </View>
                ))}
              </View>
              {/* You might integrate a chart library here */}
              <View style={[styles.barContainer, { marginTop: 15 }]}>
                {/* This pink bar is just a placeholder */}
                <View style={[styles.barFill, { width: screenWidth * 0.5 }]} />
              </View>
            </View>
          </View>

          {/* Cycle Predictions Section */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Cycle Predictions</Text>
            <View style={styles.sectionBody}>
              {cyclePredictions.map((prediction, i) => (
                <Text key={i} style={styles.sectionDesc}>
                  • {prediction}
                </Text>
              ))}
              {/* Another bar example */}
              <View style={[styles.barContainer, { marginTop: 10 }]}>
                <View style={[styles.barFill, { width: screenWidth * 0.3 }]} />
              </View>
            </View>
          </View>

          {/* Stress Over Time Section */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>Stress Over Time</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.sectionDesc}>
                Your stress levels for this workweek:
              </Text>
              {stressData.map(({ day, level }, idx) => (
                <Text key={idx} style={styles.sectionDesc}>
                  {day}: {level}
                </Text>
              ))}
              {/* Additional placeholder bar */}
              <View style={[styles.barContainer, { marginTop: 10 }]}>
                <View style={[styles.barFill, { width: screenWidth * 0.4 }]} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
};

export default InsightsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainContent: {
    flex: 1
  },
  scrollContentContainer: {
    paddingBottom: 20
  },
  titleContainer: {
    backgroundColor: lightPink,
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    color: pinkColor,
    fontWeight: '700',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#333'
  },
  sectionBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    padding: 12,
    shadowColor: pinkColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 16,
    color: pinkColor,
    fontWeight: '700',
    marginBottom: 8
  },
  sectionBody: {
    marginTop: 2
  },
  sectionDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18
  },
  hormonePill: {
    backgroundColor: '#FFE6F2',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8
  },
  barContainer: {
    height: 8,
    backgroundColor: '#FFE6F2',
    borderRadius: 4
  },
  barFill: {
    backgroundColor: '#d63384',
    height: 8,
    borderRadius: 4
  },

  /* Footer Nav */
  footerNav: {
    flexDirection: 'row',
    backgroundColor: '#d63384',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0, left: 0, right: 0
  },
  navItem: {
    alignItems: 'center'
  },
  navEmoji: {
    fontSize: 24,
    marginBottom: 2,
    color: '#fff'
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600'
  }
});

