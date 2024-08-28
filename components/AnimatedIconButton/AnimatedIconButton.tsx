import React from "react";
import { Animated, StyleSheet, Easing, TouchableOpacity } from "react-native";

interface AnimatedIconButtonProps {
  iconComponent?: React.JSX.Element;
  onPress: () => void;
}

const AnimatedIconButton: React.FC<AnimatedIconButtonProps> = ({
  onPress,
  iconComponent,
}) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      onPress();
    });
  };

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[styles.button, { transform: [{ scale: scaleValue }] }]}
      >
        {iconComponent}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 54,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.8,
    elevation: 5,
  },
});

export default AnimatedIconButton;
