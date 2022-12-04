// Outer imports:
import React from 'react';
import {View, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import {colors} from '../../constants/colors';

// Inner imports:

interface Props {
  focused: boolean;
  icon: ImageSourcePropType;
}

const TabIcon: React.FC<Props> = ({focused, icon}: Props) => {
  return (
    <View style={styles.tabIcon}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          styles.icon,
          {tintColor: focused ? colors.darkGreen : colors.lightLime},
        ]}
      />

      {focused && <View style={styles.iconUndeline} />}
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 50,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconUndeline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.darkGreen,
  },
});
