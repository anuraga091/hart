// LocationService.js
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestLocationPermission = async () => {
  let permission;
  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  } else {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }

  const result = await check(permission);
  if (result !== RESULTS.GRANTED) {
    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED;
  }

  return true;
};

const getLocation = async (onSuccess, onError) => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    Geolocation.getCurrentPosition(
      position => onSuccess(position),
      error => onError(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
};

export { getLocation };

