import RNFetchBlob from 'react-native-fetch-blob';

export function getLocationAddres(neighborhood, street, state, city) {
  const address = `${neighborhood}, ${street}, ${city}, ${state}`;
  const pathAddress = address.replace(/ /g, '+');
  console.log(pathAddress, 'address');
  return RNFetchBlob.fetch('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${pathAddress}`)
    .then(response => response.json())
    .then(responseJson => responseJson)
    .catch(error => console.error(error));
}
