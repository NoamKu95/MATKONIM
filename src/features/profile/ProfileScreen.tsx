// Outer imports:
import React from 'react';
import {View, StyleSheet, Pressable, Dimensions, Image} from 'react-native';
import i18n from '../../translations/i18n';

// Inner imports:
import {colors} from '../../constants/colors';
import LogoutIcon from '../../assets/icons/svg/LogoutIcon';

// Redux:
import {useAppDispatch, useAppSelector} from '../../store/store';
import {signOutFromFirebase} from '../auth/state/authActions';

// Components:
import RegularText from '../../components/text/RegularText';
import BoldText from '../../components/text/BoldText';
import {images} from '../../constants/images';
import {icons} from '../../constants/icons';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const userSurname = useAppSelector(state => state.auth.userName);

  const renderSheet = () => {
    return (
      <View style={styles.sheetContainer}>
        {renderHeyUser()}
        {renderLogout()}
      </View>
    );
  };

  const renderHeyUser = () => {
    return (
      <>
        <View style={styles.textsContainer}>
          <BoldText
            children={`${i18n.t('profile.heyUser')} ${userSurname ?? ''}`}
            size={24}
            color={colors.darkLime}
            textAlign="left"
            lineHeight={32}
          />
          <RegularText
            children={i18n.t('profile.personalText')}
            size={16}
            color={colors.gray}
            textAlign="left"
            lineHeight={24}
          />
        </View>
      </>
    );
  };

  const renderLogout = () => {
    return (
      <View style={styles.logoutContainer}>
        <Pressable
          style={styles.logoutContainer}
          onPress={() => {
            dispatch(signOutFromFirebase);
          }}>
          <View style={styles.iconWrapper}>
            <LogoutIcon />
          </View>
          <BoldText
            children={i18n.t('profile.logout')}
            size={14}
            color={colors.lime}
            textAlign="left"
          />
        </Pressable>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={styles.userDetailsContainer}>
          <Image
            source={icons.abstract_shape1}
            resizeMethod={'resize'}
            style={styles.userIcon}
          />
          <View style={{flexDirection: 'column'}}>
            <BoldText
              children="נעם קורצר"
              size={32}
              color={colors.white}
              textAlign="right"
              lineHeight={32}
            />
            <View style={styles.recipesNumberWrapper}>
              <RegularText
                children="כמות מתכונים: 24"
                size={16}
                color={colors.white}
                textAlign="left"
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderSheet()}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lime,
  },
  sheetContainer: {
    marginTop: '20%',
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 32,
  },

  // USER DETAILS
  userDetailsContainer: {
    paddingTop: 32,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.transparentBlack9,
    backgroundColor: colors.transparentBlack1,
    marginHorizontal: 32,
  },
  recipesNumberWrapper: {
    padding: 8,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
    alignContent: 'center',
    marginVertical: 8,
  },

  textsContainer: {
    paddingVertical: 12,
  },

  // LOGOUT
  logoutContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    paddingRight: 8,
  },
});
