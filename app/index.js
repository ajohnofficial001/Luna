"use client";

import { 
  View, 
  ScrollView, 
  SafeAreaView, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity, 
  Alert, 
  Text, 
  StyleSheet, 
  Dimensions 
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, SIZES, SHADOWS } from "../constants";
import { DashboardView } from "../components";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ChatbotButton from "../components/chatbot/ChatbotButton";
import ChatbotOverlay from "../components/chatbot/ChatbotOverlay";

const Home = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { darkMode, colors } = useTheme();
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  useEffect(() => {
    // Show sign-in prompt after 10 seconds if user not authenticated
    const timer = setTimeout(() => {
      if (!user && !isLoading) {
        Alert.alert(
          "Welcome to Job Help!",
          "Would you like to sign in or create an account to access all features?",
          [
            { text: "Maybe Later", style: "cancel" },
            { text: "Sign In", onPress: () => router.push("/auth/signin") },
            { text: "Create Account", onPress: () => router.push("/auth/signup") },
          ]
        );
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [user, isLoading]);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: darkMode ? colors.background : COLORS.lightWhite,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  // Determine the profile image source
  const profileImageSource = user?.profilePicture
    ? { uri: user.profilePicture }
    : {
        uri: "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      };

  // Handler for the bottom nav items
  const handleNavPress = (screenName) => {
    // Example navigation; adjust to your router structure:
    console.log(`Navigating to: ${screenName}`);
    switch (screenName) {
      case "Dashboard":
        // Possibly: router.push("/dashboard");
        break;
      case "Calendar":
        // router.push("/calendar");
        break;
      case "Insights":
        // router.push("/insights");
        break;
      case "Profile":
        // router.push("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? colors.background : COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: darkMode ? colors.background : COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <Image
              source={icons.logo}
              style={{
                width: 50,
                height: 40,
                resizeMode: "contain",
              }}
            />
          ),
          headerTitle: "Luna Cycle",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
            color: COLORS.primary,
          },
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Bookmarks icon */}
              <TouchableOpacity
                style={{
                  marginRight: SIZES.medium,
                  padding: SIZES.small / 2,
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.small,
                }}
                onPress={() => router.push("/bookmarks")}
              >
                <Image
                  source={icons.heart}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                  }}
                />
              </TouchableOpacity>

              {/* Profile Picture */}
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.white,
                  overflow: "hidden",
                  ...SHADOWS.small,
                }}
                onPress={() => (user ? router.push("/profile") : router.push("/auth/signin"))}
              >
                <Image
                  source={profileImageSource}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      {/* The main content. We add extra bottom padding so the content doesn't hide behind the footer */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flex: 1 }}>
          {/* The main Dashboard content - no footer inside DashboardView now */}
          <DashboardView />
        </View>
      </ScrollView>

      {/* Chatbot Button */}
      <ChatbotButton onPress={toggleChatbot} isActive={isChatbotVisible} />

      {/* Chatbot Overlay */}
      <ChatbotOverlay isVisible={isChatbotVisible} onClose={() => setIsChatbotVisible(false)} />      

      {/* Footer Navigation pinned to bottom */}
      <View style={styles.footerNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("Dashboard")}>
          <Text style={styles.navEmoji}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("Calendar")}>
          <Text style={styles.navEmoji}>📅</Text>
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("Insights")}>
          <Text style={styles.navEmoji}>📈</Text>
          <Text style={styles.navText}>Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress("Profile")}>
          <Text style={styles.navEmoji}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Chatbot Button */}
      <ChatbotButton onPress={toggleChatbot} isActive={isChatbotVisible} />

      {/* Chatbot Overlay */}
      <ChatbotOverlay isVisible={isChatbotVisible} onClose={() => setIsChatbotVisible(false)} />
    </SafeAreaView>
  );
};

export default Home;

// Move the pinned nav styles here
const pinkColor = "#d63384";
const styles = {
  footerNav: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: pinkColor,
    height: 60,
    alignItems: "center",
    justifyContent: "space-around",
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
};
