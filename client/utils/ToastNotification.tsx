import { useEffect } from 'react'
import ToastManager, { Toast } from 'toastify-react-native'
import { useTheme } from '@/providers/ThemeProviders';

const ToastNotification = ({message, type}: {message: string, type: 'success' | 'error' | 'info'}) => {
    const { theme, isDarkMode } = useTheme();
    

    const showToast = () => {
        if (type === 'info') {
            Toast.show({
                text1: message,
                type: 'info',
                position: 'top',
                visibilityTime: 3000,
                theme: !isDarkMode ? 'dark' : 'light',
            });
        } else {
            Toast.show({
                text1: message,
                type: type,
                position: 'top',
                visibilityTime: 3000,
                theme: !isDarkMode ? 'dark' : 'light',
            });
        }
    }

    useEffect(() => {
        showToast();
    }, []);

    return (
        <ToastManager />
    )
}

export default ToastNotification