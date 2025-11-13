import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { X, Bell, CheckCircle, AlertCircle, Info, Gift } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'gift';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ visible, onClose }: NotificationPanelProps) {
  const [slideAnim] = useState(new Animated.Value(300));

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'gift',
      title: 'Welcome Bonus!',
      message: 'You received a ₹50 welcome bonus. Start playing now!',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'success',
      title: 'Deposit Successful',
      message: 'Your deposit of ₹100 has been processed successfully.',
      time: '5 hours ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'New Game Available',
      message: 'Check out our new game "Mega Fortune" with 5000x multiplier!',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Withdrawal Pending',
      message: 'Your withdrawal request is being processed. It may take 24-48 hours.',
      time: '2 days ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'gift',
      title: 'Daily Bonus',
      message: 'Claim your daily bonus of 50 coins now!',
      time: '3 days ago',
      isRead: true,
    },
  ];

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color={theme.colors.success} />;
      case 'warning':
        return <AlertCircle size={20} color={theme.colors.error} />;
      case 'gift':
        return <Gift size={20} color={theme.colors.primary} />;
      default:
        return <Info size={20} color={theme.colors.primary} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.error;
      case 'gift':
        return theme.colors.primary;
      default:
        return theme.colors.primary;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.panel,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}>
              {/* Panel Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Bell size={22} color={theme.colors.primary} />
                  <Text style={styles.headerTitle}>Notifications</Text>
                  {unreadCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{unreadCount}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={22} color={theme.colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Notifications List */}
              <ScrollView
                style={styles.notificationsList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.notificationsContent}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <TouchableOpacity
                      key={notification.id}
                      style={[
                        styles.notificationItem,
                        !notification.isRead && styles.unreadNotification,
                      ]}
                      activeOpacity={0.7}>
                      <View
                        style={[
                          styles.notificationIconContainer,
                          { backgroundColor: getNotificationColor(notification.type) + '20' },
                        ]}>
                        {getNotificationIcon(notification.type)}
                      </View>
                      <View style={styles.notificationContent}>
                        <View style={styles.notificationHeader}>
                          <Text style={styles.notificationTitle}>{notification.title}</Text>
                          {!notification.isRead && <View style={styles.unreadDot} />}
                        </View>
                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Bell size={48} color={theme.colors.textSecondary} />
                    <Text style={styles.emptyStateText}>No notifications</Text>
                    <Text style={styles.emptyStateSubtext}>
                      You're all caught up!
                    </Text>
                  </View>
                )}
              </ScrollView>

              {/* Footer Actions */}
              {notifications.length > 0 && (
                <View style={styles.footer}>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Mark all as read</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  panel: {
    width: '85%',
    maxWidth: 400,
    height: '100%',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.primary,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    padding: 20,
    paddingBottom: 100,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
  unreadNotification: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary + '40',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: 6,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: theme.fonts.headingBold,
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
    backgroundColor: theme.colors.white,
  },
  footerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.button,
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodySemiBold,
    color: theme.colors.white,
  },
});

