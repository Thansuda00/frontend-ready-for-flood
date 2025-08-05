import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

class NotificationService {
    constructor() {
        this.initialize();
    }

    private initialize = async (): Promise<void> => {
        // Request permission for notifications
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Notification permission granted.');
            this.getFCMToken();
        }

        // Listen for foreground messages
        messaging().onMessage(async remoteMessage => {
            console.log('Foreground notification received:', remoteMessage);
            this.showNotification(remoteMessage.notification?.title, remoteMessage.notification?.body);
        });

        // Listen for background messages
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background notification received:', remoteMessage);
        });
    };

    private getFCMToken = async (): Promise<void> => {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        // You can send this token to your server to send notifications
    };

    public showNotification = (title: string | undefined, message: string | undefined): void => {
        PushNotification.localNotification({
            title: title || 'Notification',
            message: message || 'You have a new message.',
            playSound: true,
            soundName: 'default',
            importance: 'high',
        });
    };

    public cancelAllNotifications = (): void => {
        PushNotification.cancelAllLocalNotifications();
    };
}

const notificationService = new NotificationService();
export default notificationService;
