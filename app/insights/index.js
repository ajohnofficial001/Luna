// components/InsightsView.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from "react-native-chart-kit";
import { Stack, useRouter } from "expo-router";

const pinkColor = "#d63384";
const lightPink = "#FFE6F2";
const screenWidth = Dimensions.get("window").width;

export default function InsightsView() {
  // Example line chart data for hormone levels
  const hormoneData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [14, 16, 19, 23, 20, 22],
        color: () => pinkColor, // optional
        strokeWidth: 2,         // optional
      },
    ],
    legend: ["Estrogen (pg/mL)"], 
  };

  // Example bar chart data for stress
  const stressData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [1.2, 2.5, 1.0, 3.0, 1.8, 2.2, 1.4],
      },
    ],
  };

  // Chart config for consistent styling
  const chartConfig = {
    backgroundColor: lightPink,
    backgroundGradientFrom: lightPink,
    backgroundGradientTo: "#fff",
    color: () => pinkColor,
    labelColor: () => "#555",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.7,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: "4",
      strokeWidth: "1",
      stroke: "#ffa6c9",
    },
  };

  return (
    <>
        <Stack.Screen options={{ headerTitle: "Insights" }} />
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>Analyze Your Patterns</Text>

        {/* Hormone Levels (Line Chart) */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Hormone Levels</Text>
            <LineChart
            data={hormoneData}
            width={screenWidth - 40}  // minus horizontal padding
            height={220}
            chartConfig={chartConfig}
            style={styles.chartStyle}
            bezier // a smooth curved line
            />
            <Text style={styles.cardDetail}>
            This line chart shows daily estrogen fluctuations.
            </Text>
        </View>

        {/* Stress Over Time (Bar Chart) */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Stress Over Time</Text>
            <BarChart
            style={styles.chartStyle}
            data={stressData}
            width={screenWidth - 40}  // minus horizontal padding
            height={220}
            chartConfig={chartConfig}
            fromZero={true}
            yAxisLabel=""
            yAxisSuffix=""
            showValuesOnTopOfBars
            />
            <Text style={styles.cardDetail}>
            This bar chart shows “stress index” over the past 7 days.
            </Text>
        </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 60, // extra padding if a pinned footer is used
  },
  title: {
    fontSize: 20,
    color: pinkColor,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  card: {
    backgroundColor: lightPink,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: pinkColor,
    fontWeight: "600",
    marginBottom: 12,
  },
  chartStyle: {
    borderRadius: 10,
    marginBottom: 12,
  },
  cardDetail: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});
