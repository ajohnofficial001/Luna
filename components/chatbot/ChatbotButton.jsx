"use client"

import React from "react"
import { TouchableOpacity, StyleSheet, Animated, Image } from "react-native"
import { COLORS, FONT, SIZES, icons, SHADOWS } from "../../constants"


const ChatbotButton = ({ onPress, isActive }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    )

    if (!isActive) {
      pulse.start()
    } else {
      pulse.stop()
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }

    return () => pulse.stop()
  }, [isActive, pulseAnim])

  return (
    <Animated.View style={[styles.buttonContainer, { transform: [{ scale: pulseAnim }] }]}>
      <TouchableOpacity style={[styles.button, isActive && styles.activeButton]} onPress={onPress} activeOpacity={0.8}>
        {isActive ? (
          <Image source={icons.close} style={styles.closeIcon} />
        ) : (
          <Image source={icons.chatbot} style={styles.chatbotIcon} />
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 65,
    right: 15,
    zIndex: 1000,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  activeButton: {
    backgroundColor: COLORS.gray,
  },
  chatbotIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
})

export default ChatbotButton
