"use client";

import { useCallback } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Platform } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { BookmarkProvider } from "../context/BookmarkContext";
import { COLORS, icons, SIZES, SHADOWS } from "../constants";

// If you want pinned footer icons:
import { TouchableOpacity, Image, Text } from "react-native";
import { useRouter } from "expo-router";

// Polyfill AsyncStorage for web
if (Platform.OS === "web") {
  global.AsyncStorage = {
    getItem: async (key) => {
      try {
        const value = localStorage.getItem(key);
        return value;
      } catch (error) {
        console.error("AsyncStorage getItem error:", error);
        return null;
      }
    },
    setItem: async (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error("AsyncStorage setItem error:", error);
      }
    },
    removeItem: async (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("AsyncStorage removeItem error:", error);
      }
    },
  };
}

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // Example pinned footer navigation handler
  const handleNavPress = (route) => {
    router.push(route);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <BookmarkProvider>
          {/*
            We wrap everything in a parent container so we can place a pinned footer
            at the bottom, with the <Stack /> in the middle.
          */}
          <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            {/* 
              The <Stack> component from expo-router handles top-level routes and
              displays the top header for child screens. 
            */}
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: COLORS.lightWhite,
                },
                headerShadowVisible: false,
                // Example if you want a default top header across all screens:
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: "700",
                  color: COLORS.primary,
                },
                // Each screen can override or add headerLeft/headerRight if needed
              }}
            />

            {/* Pinned Footer Nav */}
            <View style={styles.footerNav}>
              <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("/")}>
                <Text style={styles.navEmoji}>🏠</Text>
                <Text style={styles.navText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("/calendar")}>
                <Text style={styles.navEmoji}>📅</Text>
                <Text style={styles.navText}>Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("/insights")}>
                <Text style={styles.navEmoji}>📈</Text>
                <Text style={styles.navText}>Insights</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("/profile")}>
                <Text style={styles.navEmoji}>👤</Text>
                <Text style={styles.navText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BookmarkProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Layout;

const pinkColor = "#d63384";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  footerNav: {
    flexDirection: "row",
    backgroundColor: pinkColor,
    height: 60,
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navEmoji: {
    fontSize: 24,
    marginBottom: 2,
    color: "#fff",
  },
  navText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});
