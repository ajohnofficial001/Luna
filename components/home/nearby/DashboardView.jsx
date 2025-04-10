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

const DashboardView = () => {
  // Example states
  const [cycleDay] = useState(12);
  const [fertileWindowStart] = useState('Feb 5');
  const [fertileWindowEnd] = useState('Feb 9');
  const [dailySteps] = useState(6500);
  const [avgTemperature] = useState('36.6°C');
  const [hydrationLevel] = useState('1.8 L');

  const screenWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const handleNavPress = (screenName) => {
    console.log(`Navigating to: ${screenName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* We wrap our entire content in a container with minHeight set to the screen height */}
      <View style={[styles.mainContent, { minHeight: windowHeight-60 }]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/* Dashboard Title */}
          <View style={styles.dashboardTitleContainer}>
            <Text style={styles.dashboardTitle}>My Daily Overview</Text>
            <Text style={styles.dashboardSubTitle}>Today, 01 Feb 2025</Text>
          </View>

          {/* Cards Row 1 */}
          <View style={styles.cardsRow}>
            {/* Cycle Day Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Cycle Day</Text>
              <Text style={styles.cardValue}>{cycleDay}</Text>
              <Text style={styles.cardDetail}>Day since last period</Text>
            </View>

            {/* Fertile Window Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Fertile Window</Text>
              <Text style={styles.cardValue}>
                {fertileWindowStart} - {fertileWindowEnd}
              </Text>
              <Text style={styles.cardDetail}>Estimated next window</Text>
            </View>
          </View>

          {/* Cards Row 2 */}
          <View style={styles.cardsRow}>
            {/* Steps Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Daily Steps</Text>
              <Text style={styles.cardValue}>{dailySteps}</Text>
              <Text style={styles.cardDetail}>Goal: 8,000 steps</Text>
            </View>

            {/* Temperature Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Avg Temp</Text>
              <Text style={styles.cardValue}>{avgTemperature}</Text>
              <Text style={styles.cardDetail}>Data from wearable</Text>
            </View>
          </View>

          {/* Hydration & Sleep Section */}
          <Text style={styles.sectionTitle}>Hydration & Sleep</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Water Intake</Text>
            <Text style={styles.infoBoxValue}>{hydrationLevel}</Text>

            {/* Example progress bar for hydration */}
            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: screenWidth * 0.4 }]} />
            </View>
            <Text style={styles.infoBoxDetail}>
              Keep up the hydration. Aim for 2.0 L / day
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoBoxLabel}>Last Night's Sleep</Text>
            <View style={styles.sleepRow}>
              <Text style={styles.sleepMetric}>7 hrs 35 min</Text>
              <Text style={styles.sleepNote}>Fair quality</Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: screenWidth * 0.65 }]} />
            </View>
            <Text style={styles.infoBoxDetail}>
              Try to get at least 8 hours for better recovery
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardView;

const pinkColor = '#d63384';
const lightPink = '#FFE6F2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainContent: {
    flex: 1
  },
  scrollContentContainer: {
    // You can adjust this bottom padding if you want more scroll space above the nav
    paddingBottom: 20
  },
  dashboardTitleContainer: {
    backgroundColor: lightPink,
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  dashboardTitle: {
    fontSize: 18,
    color: pinkColor,
    fontWeight: '700',
    marginBottom: 4
  },
  dashboardSubTitle: {
    fontSize: 14,
    color: '#333'
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: lightPink,
    paddingVertical: 10
  },
  card: {
    backgroundColor: '#fff',
    width: 140,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: pinkColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  },
  cardTitle: {
    fontSize: 12,
    color: pinkColor,
    fontWeight: '600',
    marginBottom: 4
  },
  cardValue: {
    fontSize: 18,
    color: pinkColor,
    fontWeight: '700'
  },
  cardDetail: {
    fontSize: 12,
    color: '#666'
  },
  sectionTitle: {
    fontSize: 16,
    color: pinkColor,
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 10
  },
  infoBox: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
    shadowColor: pinkColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2
  },
  infoBoxLabel: {
    fontSize: 14,
    color: pinkColor,
    fontWeight: '600',
    marginBottom: 8
  },
  infoBoxValue: {
    fontSize: 18,
    color: pinkColor,
    fontWeight: '700',
    marginBottom: 5
  },
  infoBoxDetail: {
    fontSize: 12,
    color: '#555',
    marginTop: 6
  },
  barContainer: {
    height: 8,
    backgroundColor: lightPink,
    borderRadius: 4,
    marginTop: 5
  },
  barFill: {
    backgroundColor: pinkColor,
    height: 8,
    borderRadius: 4
  },
  sleepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  sleepMetric: {
    fontSize: 16,
    fontWeight: '700',
    color: pinkColor
  },
  sleepNote: {
    fontSize: 14,
    color: '#666'
  },
  footerNav: {
    flexDirection: 'row',
    backgroundColor: pinkColor,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    // pinned at the bottom, fully spanning left to right
    bottom: 0,
    left: 0,
    right: 0
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
