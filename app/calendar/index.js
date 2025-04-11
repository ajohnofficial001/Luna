import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Calendar } from "react-native-calendars";

const pinkColor = "#d63384";
const lightPink = "#FFE6F2";

export default function CalendarScreen() {
  // Mark 5 generic events on specific days in Feb 2025:
const [markedDays, setMarkedDays] = useState({
    "2025-04-01": {
        selected: true,
        selectedColor: pinkColor,
        marked: true,
        dotColor: pinkColor,
        event: "Cycle Day 1 (Menstrual Start)"
    },
    "2025-04-14": {
        marked: true,
        dotColor: pinkColor,
        event: "Possible Ovulation Day"
    },
    "2025-04-18": {
        marked: true,
        dotColor: "#FF7754",
        event: "Yoga Class"
    },
    "2025-04-22": {
        marked: true,
        dotColor: "#FFA6C9",
        event: "Medication Refill"
    },
    "2025-04-27": {
        marked: true,
        dotColor: "#FF7754",
        event: "Doctor Appointment"
    },
});

  // Local state to track which event is selected
  const [selectedInfo, setSelectedInfo] = useState("");

  const handleDayPress = (day) => {
    const dateKey = day.dateString;
    // If the date is in markedDays and has an event, show that
    if (markedDays[dateKey] && markedDays[dateKey].event) {
      setSelectedInfo(`On ${dateKey}: ${markedDays[dateKey].event}`);
    } else {
      setSelectedInfo(`No event on ${dateKey}`);
    }
  };

  // Build a list of events from markedDays for a mini upcoming section
  const eventList = Object.entries(markedDays)
    .map(([date, info]) => {
      if (info.event) {
        return { date, event: info.event };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Calendar" }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Calendar</Text>
        <Text style={styles.subtitle}>Track Your Cycle and Events</Text>

        <View style={styles.calendarCard}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDays}
            // Pink theme
            theme={{
              calendarBackground: lightPink,
              monthTextColor: pinkColor,
              textSectionTitleColor: pinkColor,
              dayTextColor: "#333",
              dotColor: pinkColor,
              selectedDayBackgroundColor: pinkColor,
              selectedDayTextColor: "#fff",
              todayTextColor: "#ff7754",
              arrowColor: pinkColor,
              textMonthFontWeight: "700",
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
            style={{
              borderRadius: 10,
              padding: 10,
            }}
            // e.g. start on Feb. 2025:
            initialDate="2025-02-01"
          />
        </View>

        <Text style={styles.infoText}>
          Tap on any date to see details, track your cycle, or manage events.
        </Text>

        {/* Show the selected event info below */}
        {selectedInfo ? (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedInfoText}>{selectedInfo}</Text>
          </View>
        ) : null}

        {/* Section listing significance of each marked date */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>Upcoming Events</Text>
          {eventList.length === 0 ? (
            <Text style={styles.noEventsText}>No events scheduled.</Text>
          ) : (
            eventList.map((item) => (
              <View key={item.date} style={styles.eventItem}>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventName}>{item.event}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80, // padding so it doesn't hide behind pinned footer
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16
  },
  title: {
    fontSize: 20,
    color: pinkColor,
    fontWeight: "700",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16
  },
  calendarCard: {
    backgroundColor: lightPink,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20
  },
  selectedBox: {
    backgroundColor: lightPink,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20
  },
  selectedInfoText: {
    fontSize: 14,
    color: pinkColor,
    fontWeight: "600"
  },
  eventsSection: {
    backgroundColor: lightPink,
    borderRadius: 10,
    padding: 12
  },
  eventsSectionTitle: {
    fontSize: 16,
    color: pinkColor,
    fontWeight: "700",
    marginBottom: 8
  },
  noEventsText: {
    fontSize: 14,
    color: "#666"
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  eventDate: {
    fontSize: 14,
    color: pinkColor,
    fontWeight: "600",
    marginRight: 10,
    width: 90
  },
  eventName: {
    fontSize: 14,
    color: "#333"
  }
});
