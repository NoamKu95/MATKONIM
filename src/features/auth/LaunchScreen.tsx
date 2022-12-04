import {ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import {appInit, detectLanguage} from './state/authActions';
import SplashScreen from 'react-native-splash-screen';
import {useAppDispatch} from '../../store/store';

const LaunchScreen = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      dispatch(
        appInit(isReady => {
          if (isReady) {
            SplashScreen.hide();
          }
        }),
      );
    })();
    dispatch(detectLanguage());
  }, []);
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ImageBackground
        source={require('../../assets/images/login-background.png')}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
