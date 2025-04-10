import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  TextInput
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, SIZES, FONT, icons } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
// If you'd like to use Ionicons (or any other icon library) for more fun icons, install them:
// import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileScreen = () => {
  const router = useRouter();
  const { user, signOut, isLoading, uploadProfilePicture, updateProfile } = useAuth();
  const { darkMode, colors, toggleDarkMode } = useTheme();

  // Profile data now includes emergencyContacts, profilePicture, etc.
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Default joinDate to 2025-04-01 if none is provided
    joinDate: '2025-04-01',
    currentPlan: 'Free Plan',
    emergencyContacts: [],
    profilePicture: null
  });

  const [usageDuration, setUsageDuration] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // On mount/update, if user is available, populate the local profileData
  useEffect(() => {
    if (!user) {
      router.replace('/auth/signin');
    } else {
      setProfileData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        // If user.joinDate is missing, default to '2025-04-01'
        joinDate: user.joinDate || '2025-04-01',
        currentPlan: user.currentPlan || 'Free Plan',
        emergencyContacts: user.emergencyContacts || [],
        profilePicture: user.profilePicture || null
      }));
    }
  }, [user]);

  // Calculate usage duration from joinDate
  useEffect(() => {
    if (profileData.joinDate) {
      const joinDateObj = new Date(profileData.joinDate);
      const now = new Date();
      const diffTime = Math.abs(now - joinDateObj);
      // If joinDate is in the future, usage is 0 days
      if (now < joinDateObj) {
        setUsageDuration('0 days');
      } else {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setUsageDuration(`${diffDays} days`);
      }
    } else {
      setUsageDuration('0 days');
    }
  }, [profileData.joinDate]);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: () => {
          router.replace('/auth/signin');
          signOut();
        }
      }
    ]);
  };

  // Trigger the photo upload, updating local state upon success
  const handleUploadPhoto = async () => {
    try {
      const result = await uploadProfilePicture();
      if (result.success) {
        setProfileData(prev => ({
          ...prev,
          profilePicture: result.uri
        }));
        Alert.alert('Success', 'Profile picture updated successfully!');
      } else {
        Alert.alert('Error', result.error || 'Failed to upload profile picture.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while uploading photo.');
    }
  };

  // Save profile data, including emergencyContacts
  const handleSaveProfile = async () => {
    try {
      const updateResult = await updateProfile({
        email: profileData.email,
        phone: profileData.phone,
        emergencyContacts: profileData.emergencyContacts,
        profilePicture: profileData.profilePicture
      });
      if (updateResult.success) {
        Alert.alert('Profile Saved', 'Your profile has been updated.');
      } else {
        Alert.alert('Error', updateResult.error || 'Failed to save updates.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving your profile.');
    }
    setIsEditing(false);
  };

  // Update emergency contacts inline
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...profileData.emergencyContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value
    };
    setProfileData({ ...profileData, emergencyContacts: updatedContacts });
  };

  // Add a new blank contact
  const handleAddContact = () => {
    const newContact = { name: '', phone: '' };
    setProfileData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, newContact]
    }));
  };

  // Remove a contact from the array
  const handleRemoveContact = (index) => {
    const updatedContacts = [...profileData.emergencyContacts];
    updatedContacts.splice(index, 1);
    setProfileData({ ...profileData, emergencyContacts: updatedContacts });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#ffe6f2' }]}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#ffe6f2' },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.headerButton} onPress={toggleDarkMode}>
                <Text style={styles.headerButtonText}>{darkMode ? '☀️' : '🌙'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, { marginLeft: 10 }]}
                onPress={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.headerButtonText}>
                    {isEditing ? '💾' : '✏️'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ),
          headerTitle: ''
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>My Profile</Text>

        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          {profileData.profilePicture ? (
            <Image
              source={{ uri: profileData.profilePicture }}
              style={styles.profilePic}
            />
          ) : (
            <View style={styles.placeholderPic}>
              {/* Place a fun icon or text placeholder */}
              <Text style={{ color: '#d63384', fontSize: 24 }}>No Pic</Text>
            </View>
          )}
          <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadPhoto}>
            <Text style={styles.uploadBtnText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Name (read-only in this example) */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.infoText}>
            {profileData.firstName} {profileData.lastName}
          </Text>
        </View>

        {/* Email */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => setProfileData({ ...profileData, email: text })}
            />
          ) : (
            <Text style={styles.infoText}>{profileData.email}</Text>
          )}
        </View>

        {/* Phone */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Phone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.phone}
              onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
            />
          ) : (
            <Text style={styles.infoText}>{profileData.phone}</Text>
          )}
        </View>

        {/* Usage Duration */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Using Luna Since</Text>
          <Text style={styles.infoText}>{usageDuration || 'N/A'}</Text>
        </View>

        {/* Current Plan */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Current Plan</Text>
          <Text style={styles.infoText}>{profileData.currentPlan}</Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Emergency Contacts</Text>
          {profileData.emergencyContacts.length > 0 ? (
            profileData.emergencyContacts.map((contact, index) => (
              <View key={index} style={styles.contactRow}>
                {isEditing ? (
                  <>
                    <TextInput
                      style={[styles.input, styles.contactInput]}
                      placeholder="Name"
                      value={contact.name}
                      onChangeText={(val) => handleContactChange(index, 'name', val)}
                    />
                    <TextInput
                      style={[styles.input, styles.contactInput]}
                      placeholder="Phone"
                      value={contact.phone}
                      onChangeText={(val) => handleContactChange(index, 'phone', val)}
                    />
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => handleRemoveContact(index)}
                    >
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoText}>
                      {contact.name} - {contact.phone}
                    </Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.infoText}>No emergency contacts added.</Text>
          )}

          {/* Button to add a new contact (only when editing) */}
          {isEditing && (
            <TouchableOpacity style={styles.addContactBtn} onPress={handleAddContact}>
              <Text style={styles.addContactBtnText}>+ Add Contact</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 60,
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#d63384', // darker pink text
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center'
  },
  headerButton: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small / 2,
    backgroundColor: '#d63384',
    borderRadius: SIZES.medium
  },
  headerButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: '#fff'
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#d63384'
  },
  placeholderPic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#d63384',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  uploadBtn: {
    backgroundColor: '#d63384',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  infoBox: {
    backgroundColor: '#fff0f5', // very light pink
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#d63384',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  label: {
    fontSize: 16,
    color: '#a2005d',
    fontWeight: '600',
    marginBottom: 5
  },
  infoText: {
    fontSize: 16,
    color: '#333'
  },
  input: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f7c6d0',
    borderRadius: 6,
    padding: 8,
    marginTop: 5
  },
  contactRow: {
    borderTopWidth: 1,
    borderTopColor: '#f7c6d0',
    paddingTop: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contactInput: {
    flex: 1,
    marginRight: 5
  },
  removeBtn: {
    backgroundColor: '#ffa6c9',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  removeBtnText: {
    color: '#a2005d',
    fontWeight: '600'
  },
  addContactBtn: {
    marginTop: 10,
    backgroundColor: '#d63384',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center'
  },
  addContactBtnText: {
    color: '#fff',
    fontWeight: '600'
  },
  signOutButton: {
    backgroundColor: '#d63384',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30
  },
  signOutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ProfileScreen;
