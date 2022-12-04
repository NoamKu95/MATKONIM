import * as React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {RootStackParamList, Screens} from '../constants/screens';
import TabsNavigator from '../navigation/TabsNavigator';

// Screens
// import Onboarding from '../features/onboarding/Onboarding';
import LoginScreen from '../features/auth/Login';
import RecipeScreen from '../features/recipe/RecipePage';
import LaunchScreen from '../features/auth/LaunchScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <>
      <SafeAreaView
        style={styles.bottomAreaView}
        edges={['left', 'right', 'bottom']}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName={Screens.SPLASH}>
            <Stack.Screen
              name={Screens.SPLASH}
              component={LaunchScreen}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen
              name={Screens.ONBOARDING}
              component={Onboarding}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name={Screens.LOGIN}
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screens.TABS}
              component={TabsNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={Screens.RECIPE}
              component={RecipeScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  bottomAreaView: {
    flex: 1,
  },
});
