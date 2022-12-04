import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type Props = {
  children: React.ReactNode;
  visible: boolean;
};

const FadePanel = ({children, visible}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (!visible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {children}
    </Animated.View>
  );
};

export default FadePanel;
