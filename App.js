import { Navigation } from 'react-native-navigation'
import { registerScreens } from './src/screens/screens';

//Register screens
registerScreens();

//Start an App
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'authId',
        children: [
          {
            component: {
              name: 'AuthScreen',
            }
          }
        ]
      }
    }
  });
});