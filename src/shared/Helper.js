import { NetInfo } from 'react-native';

export class Helper {
  static checkConnection() {
    function handleConnectivityChange(isConnected) {
      console.log(isConnected);
    }
    NetInfo.isConnected.addEventListener('change', handleConnectivityChange);
  }
}
