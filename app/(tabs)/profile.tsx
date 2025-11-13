import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Image,
} from 'react-native';
import {
  User,
  Edit3,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Trophy,
  Coins,
  Wallet,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Moon,
  Sun,
  Shield,
  Lock,
  CreditCard,
  HelpCircle,
  Info,
  LogOut,
  Trash2,
  Camera,
  Award,
  TrendingUp,
  Gamepad2,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 15, 2024',
    location: 'New York, USA',
    avatar: null, // In real app, this would be an image URI
    level: 12,
    totalGames: 142,
    totalWins: 88,
    winRate: 62.2,
    totalWinnings: 8200,
    currentRank: 5,
    bestScore: 12500,
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleChangeAvatar = () => {
    Alert.alert('Change Avatar', 'Avatar upload feature coming soon!');
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Best Score',
      'Are you sure you want to clear your best score? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('bestScore');
              Alert.alert('Success', 'Your best score has been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear best score.');
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            // Call logout function from auth context
            // This will clear auth state and navigate to login
            await logout();
          } catch (error) {
            Alert.alert('Error', 'Failed to logout. Please try again.');
            console.error('Logout error:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <User size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Profile</Text>
            </View>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Avatar and Basic Info */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                style={styles.avatarWrapper}
                onPress={handleChangeAvatar}
                activeOpacity={0.8}>
                {userProfile.avatar ? (
                  <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <User size={48} color={theme.colors.white} />
                  </View>
                )}
                <View style={styles.cameraIcon}>
                  <Camera size={16} color={theme.colors.white} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{userProfile.name}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditProfile}
                  activeOpacity={0.7}>
                  <Edit3 size={16} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.userEmail}>{userProfile.email}</Text>
              <View style={styles.levelBadge}>
                <Award size={14} color={theme.colors.primary} />
                <Text style={styles.levelText}>Level {userProfile.level}</Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, styles.statIconPrimary]}>
                <Trophy size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{userProfile.currentRank}</Text>
                <Text style={styles.statLabel}>Rank</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, styles.statIconSuccess]}>
                <Gamepad2 size={20} color={theme.colors.success} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{userProfile.totalGames}</Text>
                <Text style={styles.statLabel}>Games</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, styles.statIconSuccess]}>
                <TrendingUp size={20} color={theme.colors.success} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{userProfile.winRate}%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, styles.statIconPrimary]}>
                <Coins size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>₹{userProfile.totalWinnings.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Winnings</Text>
              </View>
            </View>
          </View>

          {/* Profile Details */}
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Profile Information</Text>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Mail size={18} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{userProfile.email}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Phone size={18} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>{userProfile.phone}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Calendar size={18} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Member Since</Text>
                <Text style={styles.detailValue}>{userProfile.joinDate}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MapPin size={18} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{userProfile.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionHeader}>Settings</Text>

          {/* Preferences */}
          <View style={styles.settingsGroup}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                {soundEnabled ? (
                  <Volume2 size={24} color={theme.colors.primary} />
                ) : (
                  <VolumeX size={24} color={theme.colors.textSecondary} />
                )}
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Sound Effects</Text>
                  <Text style={styles.settingDescription}>
                    Play sounds during gameplay
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{
                  false: theme.colors.surface,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.white}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                {notificationsEnabled ? (
                  <Bell size={24} color={theme.colors.primary} />
                ) : (
                  <BellOff size={24} color={theme.colors.textSecondary} />
                )}
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Receive push notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: theme.colors.surface,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.white}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                {darkMode ? (
                  <Moon size={24} color={theme.colors.primary} />
                ) : (
                  <Sun size={24} color={theme.colors.textSecondary} />
                )}
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>
                    Switch to dark theme
                  </Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: theme.colors.surface,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.white}
              />
            </View>
          </View>

          {/* Account */}
          <View style={styles.settingsGroup}>
            <Text style={styles.sectionTitle}>Account</Text>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Shield size={24} color={theme.colors.primary} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Privacy & Security</Text>
                  <Text style={styles.settingDescription}>
                    Manage your privacy settings
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Lock size={24} color={theme.colors.primary} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Change Password</Text>
                  <Text style={styles.settingDescription}>
                    Update your account password
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <CreditCard size={24} color={theme.colors.primary} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Payment Methods</Text>
                  <Text style={styles.settingDescription}>
                    Manage payment options
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Data */}
          <View style={styles.settingsGroup}>
            <Text style={styles.sectionTitle}>Data</Text>

            <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
              <View style={styles.settingLeft}>
                <Trash2 size={24} color={theme.colors.error} />
                <View style={styles.settingText}>
                  <Text style={[styles.settingLabel, styles.dangerText]}>
                    Clear Best Score
                  </Text>
                  <Text style={styles.settingDescription}>
                    Reset your saved best score
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Support */}
          <View style={styles.settingsGroup}>
            <Text style={styles.sectionTitle}>Support</Text>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <HelpCircle size={24} color={theme.colors.primary} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Help & Support</Text>
                  <Text style={styles.settingDescription}>
                    Get help and contact support
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.infoCard}>
              <Info size={20} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Elegant Reflex</Text>
                <Text style={styles.infoText}>Version 1.0.0</Text>
                <Text style={styles.infoDescription}>
                  A minimal and professional reflex game
                </Text>
              </View>
            </View>
          </View>

          {/* Logout */}
          <View style={styles.settingsGroup}>
            <TouchableOpacity
              style={[styles.settingItem, styles.logoutButton]}
              onPress={handleLogout}>
              <View style={styles.settingLeft}>
                <LogOut size={24} color={theme.colors.error} />
                <Text style={[styles.settingLabel, styles.dangerText]}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  profileCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.white,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  profileInfo: {
    alignItems: 'center',
    width: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + '15',
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
    gap: 6,
  },
  levelText: {
    fontSize: 12,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    gap: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconPrimary: {
    backgroundColor: theme.colors.primary + '15',
  },
  statIconSuccess: {
    backgroundColor: theme.colors.success + '15',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  detailsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  detailIcon: {
    width: 40,
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.textPrimary,
  },
  settingsSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    marginBottom: 20,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.bodyMedium,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  dangerText: {
    color: theme.colors.error,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.button,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  logoutButton: {
    backgroundColor: theme.colors.error + '10',
    borderColor: theme.colors.error + '30',
  },
});

