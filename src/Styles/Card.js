import { StyleSheet } from 'react-native';

export const CardStyles = StyleSheet.create({
 image: {
      width: 150,
      height: 150
  },
  CardContainer: {
      margin: 5,
      backgroundColor: 'white',
      flexDirection: 'row',
      elevation: 3, // android
      shadowColor: 'black', //ios
      shadowOpacity: .2, //ios
      shadowOffset: { //ios
          height: 1,
          width: -2
      }
  }
});