// Outer imports:
import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
  Keyboard,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  logUserIn,
  registerUser,
  updateAuthSection,
  validateEmail,
  validateName,
  validatePassword,
} from './state/authActions';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '../../translations/i18n';

// Inner imports:
import {images} from '../../constants/images';
import {colors} from '../../constants/colors';

// Components:
import RegularText from '../../components/text/RegularText';
import BoldText from '../../components/text/BoldText';
import ActionButton from '../../components/Buttons/ActionButton';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import Loader from '../../components/Loader';
import {textInputTypes} from '../../models/types';

const Login = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const showLogin = useAppSelector(state => state.auth.isShowLogin);
  const showRegister = useAppSelector(state => state.auth.isShowRegistration);

  const emailWarning = useAppSelector(state => state.auth.emailWarning);
  const passwordWarning = useAppSelector(state => state.auth.passwordWarning);
  const nameWarning = useAppSelector(state => state.auth.nameWarning);

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPasswordCensored, setIsPasswordCensored] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (email != null) {
        onChangeText(email, textInputTypes.EMAIL);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (password != null) {
        onChangeText(password, textInputTypes.PASSWORD);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (surname != null) {
        onChangeText(surname, textInputTypes.NAME);
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surname]);

  const onChangeText = (newTxt: string, textInputType: string) => {
    switch (textInputType) {
      case textInputTypes.EMAIL: {
        dispatch(validateEmail(newTxt));
        break;
      }
      case textInputTypes.PASSWORD: {
        dispatch(validatePassword(newTxt));
        break;
      }
      case textInputTypes.NAME: {
        dispatch(validateName(newTxt));
        break;
      }
    }
  };

  const renderMainImage = () => {
    return (
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={images.loginBackground}
          style={styles.imageBackground}
          resizeMode="cover">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[colors.transparent, colors.black]}
            style={styles.linearGradient}
          />
        </ImageBackground>
      </View>
    );
  };

  const renderTexts = () => {
    return (
      <View
        style={[
          styles.textContainer,
          showLogin || showRegister ? {top: '30%'} : {top: '40%'},
        ]}>
        <BoldText
          children={i18n.t('auth.mainTitle')}
          size={32}
          color={colors.white}
          textAlign="left"
          lineHeight={44}
        />
        <View style={styles.secondaryTextContainer}>
          <RegularText
            children={i18n.t('auth.secondaryTitle')}
            size={18}
            color={colors.lightLime}
            textAlign="left"
            lineHeight={32}
          />
        </View>
      </View>
    );
  };

  const renderOptionButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <ActionButton
          buttonText={i18n.t('auth.login')}
          buttonColors={[colors.darkGreen, colors.lime]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.loginButtonStyle}
          onPress={() => {
            dispatch(updateAuthSection('login'));
          }}
        />
        <ActionButton
          buttonText={i18n.t('auth.signup')}
          buttonColors={[colors.transparent, colors.transparent]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.signUpButtonStyle}
          onPress={() => {
            dispatch(updateAuthSection('register'));
          }}
        />
      </View>
    );
  };

  const renderLoginSection = () => {
    return (
      <View style={styles.loginSectionContainer}>
        <CustomTextInput
          textValue={email ?? ''}
          placeholderText={i18n.t('auth.loginSection.emailPlaceholder')}
          warningText={emailWarning}
          isShowWarning={emailWarning !== null}
          onChangeText={newTxt => setEmail(newTxt)}
          keyboardType={'email-address'}
        />

        <CustomTextInput
          textValue={password ?? ''}
          placeholderText={i18n.t('auth.loginSection.passwordPlaceholder')}
          warningText={passwordWarning}
          isShowWarning={passwordWarning !== null}
          onChangeText={newTxt => setPassword(newTxt)}
          isCensored={isPasswordCensored}
          iconOnPress={() => setIsPasswordCensored(!isPasswordCensored)}
        />

        <ActionButton
          buttonText={i18n.t('auth.login')}
          buttonColors={[colors.darkGreen, colors.lime]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.loginButtonStyle}
          onPress={() => {
            dispatch(logUserIn(email, password));
          }}
        />
        {renderSectionSwapButton(
          i18n.t('auth.loginSection.goRegister'),
          'registration',
        )}
      </View>
    );
  };

  const renderRegistrationSection = () => {
    return (
      <View style={styles.loginSectionContainer}>
        <CustomTextInput
          textValue={surname ?? ''}
          placeholderText={i18n.t('auth.registerSection.namePlaceholder')}
          warningText={nameWarning}
          isShowWarning={nameWarning !== null}
          onChangeText={newTxt => setSurname(newTxt)}
        />

        <CustomTextInput
          textValue={email ?? ''}
          placeholderText={i18n.t('auth.loginSection.emailPlaceholder')}
          warningText={emailWarning}
          isShowWarning={emailWarning !== null}
          onChangeText={newTxt => setEmail(newTxt)}
          keyboardType={'email-address'}
        />

        <CustomTextInput
          textValue={password ?? ''}
          placeholderText={i18n.t('auth.loginSection.passwordPlaceholder')}
          warningText={passwordWarning}
          isShowWarning={passwordWarning !== null}
          onChangeText={newTxt => setPassword(newTxt)}
          isCensored={isPasswordCensored}
          iconOnPress={() => setIsPasswordCensored(!isPasswordCensored)}
        />

        <ActionButton
          buttonText={i18n.t('auth.signup')}
          buttonColors={[colors.darkGreen, colors.lime]}
          buttonTextColor={colors.white}
          buttonTextSize={18}
          buttonContainerStyle={styles.loginButtonStyle}
          onPress={() => {
            dispatch(registerUser(email, password, surname));
          }}
        />
        {renderSectionSwapButton(
          i18n.t('auth.registerSection.goLogin'),
          'login',
        )}
      </View>
    );
  };

  const clearAllTextInputs = () => {
    setEmail(null);
    setPassword(null);
    setSurname(null);
  };

  const renderSectionSwapButton = (text: string, moveToSection: string) => {
    return (
      <Pressable
        style={styles.bottomMiniButton}
        onPress={() => {
          clearAllTextInputs();
          setIsPasswordCensored(true);
          dispatch(updateAuthSection(moveToSection));
        }}>
        <BoldText
          children={text}
          size={12}
          color={colors.darkGreen}
          textAlign="center"
          lineHeight={16}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderMainImage()}
      {!isKeyboardVisible && renderTexts()}
      {isLoading ? (
        <Loader style={styles.loader} />
      ) : (
        <>
          {!showLogin && !showRegister && renderOptionButtons()}
          {showLogin && !showRegister && renderLoginSection()}
          {!showLogin && showRegister && renderRegistrationSection()}
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },

  // LOADER
  loader: {
    justifyContent: 'center',
  },

  // BACKGROUND IMAGE
  bgImageContainer: {
    height: Dimensions.get('window').height > 700 ? '65%' : '60%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },

  // TEXTS
  textContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
  },
  secondaryTextContainer: {
    paddingVertical: 8,
  },

  // BUTTONS
  buttonsContainer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    paddingHorizontal: 8,
  },
  loginButtonStyle: {
    paddingVertical: 18,
    borderRadius: 12,
  },
  signUpButtonStyle: {
    marginTop: 24,
    paddingVertical: 18,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.darkLime,
  },
  bottomMiniButton: {
    paddingTop: 16,
  },

  // LOGIN SECTION
  loginSectionContainer: {
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    paddingHorizontal: 8,
  },
});
