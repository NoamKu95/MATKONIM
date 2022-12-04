import currentEnv from './dev.json';

const envConfig = {
  apiKey: currentEnv.apiKey,
  authDomain: currentEnv.authDomain,
  projectId: currentEnv.projectId,
  storageBucket: currentEnv.storageBucket,
  messagingSenderId: currentEnv.messagingSenderId,
  appId: currentEnv.appId,
  measurementId: currentEnv.measurementId,
  appName: currentEnv.appName,
  baseUrl: currentEnv.baseUrl,
};

export default envConfig;
