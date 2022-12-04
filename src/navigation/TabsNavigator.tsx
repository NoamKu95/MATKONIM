// Outer imports:
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Inner imports:
import {colors} from '../constants/colors';
import {icons} from '../constants/icons';

// Components:
import TabIcon from './components/TabIcon';
import Home from '../features/home/HomeScreen';
import Search from '../features/search/RecipesSearch';
import AddRecipe from '../features/addRecipe/AddRecipeScreen';
import Profile from '../features/profile/ProfileScreen';
import {TabsScreens} from '../constants/screens';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={TabsScreens.HOME}
      backBehavior="history"
      screenOptions={({}) => ({
        tabBarActiveTintColor: colors.darkLime,
        tabBarInactiveTintColor: colors.lightGray,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 70,
          alignItems: 'center',
          alignSelf: 'center',
          borderTopColor: 'transparent',
        },
        tabBarItemStyle: {
          height: 56,
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name={TabsScreens.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name={TabsScreens.SEARCH}
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tab.Screen
        name={TabsScreens.ADD_RECIPE}
        component={AddRecipe}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.plus} />
          ),
        }}
      />
      <Tab.Screen
        name={TabsScreens.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.settings} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
