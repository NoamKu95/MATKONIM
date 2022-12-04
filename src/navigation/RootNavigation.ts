import {
  CompositeNavigationProp,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabsParamList} from '../constants/screens';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

class NavigationReadiness {
  isReady = false;
  registerListener = (listener: () => void) => {
    this.listener = listener;
  };
  listener?: () => void;
  setIsReady = (isReady: boolean) => {
    if (this.listener) {
      this.listener();
    }
    this.isReady = isReady;
  };
}

export const navigationReadiness = new NavigationReadiness();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const push = (name: keyof RootStackParamList): void => {
  navigationRef.current?.dispatch(StackActions.push(name));
};
export const pop = (): void => {
  navigationRef.current?.dispatch(StackActions.pop());
};
export const navigate = (name: keyof RootStackParamList): void => {
  navigationRef.current?.navigate(name);
};

export const resetTo = (screen: keyof RootStackParamList): void => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: screen.toString()}],
  });
};

export type NavigationRoot = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<RootTabsParamList>
>;
