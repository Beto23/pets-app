// const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=ee67af2143b8fa04c6a616a156fa7761&format=json';
import RNFetchBlob from 'react-native-fetch-blob';

export function getLocationAddres() {
  return RNFetchBlob.fetch('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=152,+adolfo+lopez+mateos,+adolfo+lopez+mateos,+saltillo,+coahuila')
    .then(response => response.json())
    .then(responseJson => responseJson)
    .catch(error => console.error(error));
}
