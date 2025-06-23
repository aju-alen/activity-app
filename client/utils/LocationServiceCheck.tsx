import * as Location from 'expo-location';
import ToastNotification from './ToastNotification';

interface LocationCheckResult {
  success: boolean;
  message: string;
}

export const checkKeralaLocation = async (): Promise<LocationCheckResult> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return {
      success: false,
      message: 'Permission to access location was denied. You must be in Kerala to use this service.',
    };
  }

  try {
    const location = await Location.getCurrentPositionAsync({});
    const geocodedAddresses = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (geocodedAddresses && geocodedAddresses[0]) {
      const region = geocodedAddresses[0].region;
      if (region === 'Kerala') {
        return {
          success: true,
          message: 'Location verified.',
        };
      } else {
        return {
          success: false,
          message: 'Sorry, our service is currently only available in Kerala.',
        };
      }
    } else {
      return {
        success: false,
        message: 'Could not determine your location. Please try again.',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred while fetching your location.',
    };
  }
}; 