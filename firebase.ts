// Import the functions you need from the SDKs you need
// import * as firebase from '@react-native-firebase/app';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// import {getReactNativePersistence} from '@react-native-firebase/auth/react-native';
import envConfig from './src/config/config';

const firebaseConfig = {
  apiKey: envConfig.apiKey,
  authDomain: envConfig.authDomain,
  projectId: envConfig.projectId,
  storageBucket: envConfig.storageBucket,
  messagingSenderId: envConfig.messagingSenderId,
  appId: envConfig.appId,
  measurementId: envConfig.measurementId,
  appName: envConfig.appName,
  databaseURL: '',
};
let MatkonimApp;
// Initialize Firebase
if (app.apps.length) {
  MatkonimApp = app.app();
} else {
  (async () => {
    MatkonimApp = await app.initializeApp(firebaseConfig);
  })();
}
export default auth(MatkonimApp);
